'use client'

import { useState, useEffect, useRef } from 'react'
import { redirect } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
// import io from 'socket.io-client'
import TranscriptionComponent from './transcriptionComponent'
import { useConversationSocket } from '@/lib/sockets/conversationContext'
import { useSelector } from 'react-redux'
import { transformMessageData } from '@/utils/supabase/transfornMessageData'

const DialComponents = ({ roomId }) => {
  const socketRef = useConversationSocket()
  const contact = useSelector((state) => state.call.callData)
  
  if (!contact) {
    redirect('/dashboard/calls')
  }

  const NOISE_THRESHOLD = 0.2;
  const SILENCE_THRESHOLD = 0.1;

  const buttons = [
    {
      title: "Deafen",
      variant: {
        false: '/assets/icons/volume-fill.svg',
        true: '/assets/icons/volume-mute-fill.svg'
      },
      buttonValue: 0
    },
    {
      title: 'Microphone',
      variant: {
        false: '/assets/icons/dial mic.svg',
        true: '/assets/icons/dial mic off.svg',
        idle: '/assets/icons/enable mic.svg'
      },
      buttonValue: 1
    },
    {
      title: 'Hang Up',
      icon: '/assets/icons/hang up.svg',
      buttonValue: 2
    },
    {
      title: "Chat History",
      icon: '/assets/icons/chat-fill.svg',
      buttonValue: 3
    },
    {
      title: "Full Screen",
      icon: '/assets/icons/fullscr.svg',
      buttonValue: 4
    }
  ]

  const [isMuted, setIsMuted] = useState(false)
  const [isDeafened, setIsDeafened] = useState(false)
  const [transcript, setTranscript] = useState(null)

  const [textTranscript, setTextTranscript] = useState([])
  const [transcriptionBar, setTranscriptionBar] = useState(false)
  const [microphoneIdle, setMicrophoneIdle] = useState(false)

  const audioStreamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const recognitionRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const silenceTimerRef = useRef(null)
  const forceMute = useRef(false)
  const audioChunks = useRef([])
  let micTimeout = useRef(null)

  const getMicrophoneMedia = async () => {
    try {
      audioStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(audioStreamRef.current)
      setupSpeechRecognition()
      setupAudioContext()
      monitorNoise()
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const setupSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.onresult = (event) => {
        const currentTranscript = Array.from(event.results).map((result) => result[0].transcript).join('')
        setTranscript(currentTranscript)
      }
    }
  }

  const setupAudioContext = () => {
    const audioContext = new AudioContext()
    audioContextRef.current = audioContext
    const analyser = audioContext.createAnalyser()
    analyserRef.current = analyser
    const source = audioContext.createMediaStreamSource(audioStreamRef.current)
    source.connect(analyser)
  }

  const monitorNoise = () => {
    const analyser = analyserRef.current
    if (!analyser) return
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const checkNoise = () => {
      analyser.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength / 255

      if (average > NOISE_THRESHOLD && !isMuted) {
        // ada suara, pastikan startListening jalan dan timer dihentikan
        startListening()
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current)
          silenceTimerRef.current = null
        }
      } else if (average < SILENCE_THRESHOLD && recognitionRef.current?.isListening) {
        // suara hilang, mulai timer 2 detik buat stop recorder
        if (!silenceTimerRef.current) {
          silenceTimerRef.current = setTimeout(() => {
            stopListening()
            silenceTimerRef.current = null
          }, 2000)
        }
      }

      if (audioContextRef.current) requestAnimationFrame(checkNoise)
    }

    checkNoise()
  }

  const startListening = () => {
    const recognition = recognitionRef.current
    const recorder = mediaRecorderRef.current
    if (!recognition || recognition.isListening) return
    recognition.start()
    recognition.isListening = true
    setMicrophoneIdle(true)

    if (recorder.state !== 'recording') recorder.start()
    const chunks = []
    recorder.ondataavailable = (e) => chunks.push(e.data)
    recorder.onstop = () => {
      if (forceMute.current) {
        console.log('Mic is force muted, not sending audio')
        forceMute.current = false
        return
      }

      const audioBlob = new Blob(chunks, { type: 'audio/wav' })
      if (audioBlob.size < 4000) return
      socketRef.current.emit('sendVoiceMessage', {
        chat: roomId,
        content: audioBlob,
        contentType: 'audio/wav',
      }, (response) => console.log(response))
      muteMic()
    }
  }

  const stopListening = () => {
    const recognition = recognitionRef.current
    const recorder = mediaRecorderRef.current
    if (!recognition?.isListening) return

    recognition.stop()
    recognition.isListening = false
    setMicrophoneIdle(false)

    if (recorder && recorder.state === 'recording') {
      // stop recorder langsung tanpa timeout delay
      recorder.stop()
    }
  }


  const muteMic = () => {
    setIsMuted(true)
    audioStreamRef.current?.getAudioTracks().forEach((track) => (track.enabled = false))
    stopListening()
    if (mediaRecorderRef.current) {
      clearTimeout(mediaRecorderRef.current.stopTimeout)
      mediaRecorderRef.current.stop()
    }
  }

  const unmuteMic = () => {
    setIsMuted(false)
    audioStreamRef.current?.getAudioTracks().forEach((track) => (track.enabled = true))
    startListening()
  }

  const handleMuteMic = () => {
    if (isMuted) {
      forceMute.current = false
      unmuteMic()
    } else {
      forceMute.current = true
      muteMic()
    }
  }

  const handleHangUp = () => {
    audioStreamRef.current?.getTracks().forEach((track) => track.stop())
    mediaRecorderRef.current?.stop()
    socketRef.current?.emit('hangUp', { room_id: roomId })
    socketRef.current?.disconnect()

    redirect('/dashboard/calls')
  }

  const handleTranscriptionBar = () => {
    setTranscriptionBar(!transcriptionBar)
  }

  const handleDialButton = (value) => {
    switch (value) {
      case 0:
        setIsDeafened(!isDeafened)
        break
      case 1:
        handleMuteMic()
        break
      case 2:
        console.log('Hang Up')
        handleHangUp()
        break
      case 3:
        handleTranscriptionBar()
        break
      case 4:
        console.log('Full Screen')
        break
    }
  }

  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    socket.emit('joinCall', { callRoom: roomId })


    // // give delay before getting microphone
    socket.on('joinedCall', (data) => {
      console.log(data)
      
      if(micTimeout.current) {
        clearTimeout(micTimeout.current)
      }

      micTimeout.current = setTimeout(() => {
        getMicrophoneMedia()
      }, 1000)
    })

    socket.on('receivedVoiceStream', (data) => {
      audioChunks.current.push(data.audioData)

      if (data.endChunk) {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/ogg' })
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)

        audioChunks.current = []
        
        audio.play().then(() => {
          console.log('AI audio started playing')
        }).catch((err) => {
          console.error('Audio play error:', err)
        })

        audio.addEventListener('ended', () => {
          console.log('AI done speaking, unmuting mic...')
          setTimeout(() => {
            unmuteMic()
          }, 300)
        })
      }
    })


    socket.on('receivedVoiceTranscription', (data) => {
      const transformTranscription = data.map(transformMessageData)
      setTextTranscript((prev) => [...prev, ...transformTranscription])
    })

    // socket.on('connect_error', (err) => {
    //   console.error('Socket connection error:', err)
    // })

    socket.on('hangUp', (data) => {
      console.log('Hang up event received:', data)
    })

    return () => {
      if (micTimeout.current) {
        clearTimeout(micTimeout.current)
      }
      socket.off('connect')
      socket.off('joinedCall')
      socket.off('receivedVoiceStream')
      socket.off('receivedVoiceTranscription')
    }
  }, [socketRef, roomId]);

  // useEffect(() => {
  //   // return () => handleHangUp();
  // }, []);

  return (
    <div className="flex w-full h-full">
      <div className="flex w-full flex-col h-full justify-center items-center">
        <div className="absolute">
          <div className="flex flex-col items-center">
            <Image
              src={contact.profileImage}
              alt={contact.title}
              width={300}
              height={300}
              className="w-32 rounded-full shadow-chara-image"
            ></Image>
          </div>
        </div>

        <div className="flex h-full items-end gap-x-10 mb-3 justify-center">
          <button onClick={() => handleDialButton(buttons[0].buttonValue)}>
            <div className="flex w-fit h-fit px-1">
              <Image
                src={buttons[0].variant[isDeafened]}
                alt={buttons[0].title}
                width={100}
                height={100}
                className='w-6'
              ></Image>
            </div>
          </button>
          <button onClick={() => handleDialButton(buttons[1].buttonValue)}>
            <div className="flex w-fit h-fit px-1">
              <Image
                src={isMuted ? buttons[1].variant[true] : microphoneIdle ? buttons[1].variant.idle : buttons[1].variant[false]}
                alt={buttons[1].title}
                width={100}
                height={100}
                className='w-6'
              ></Image>
            </div>
          </button>
          <button onClick={() => handleDialButton(buttons[2].buttonValue)}>
            <div className="flex w-fit h-fit px-1">
              <Image
                src={buttons[2].icon}
                alt={buttons[2].title}
                width={100}
                height={100}
                className='w-10'
              ></Image>
            </div>
          </button>
          <button onClick={() => handleDialButton(buttons[3].buttonValue)}>
            <div className="flex w-fit h-fit px-1">
              <Image
                src={buttons[3].icon}
                alt={buttons[3].title}
                width={100}
                height={100}
                className='w-6'
              ></Image>
            </div>
          </button>
          <button onClick={() => handleDialButton(buttons[4].buttonValue)}>
            <div className="flex w-fit h-fit px-1">
              <Image
                src={buttons[4].icon}
                alt={buttons[4].title}
                width={100}
                height={100}
                className='w-6'
              ></Image>
            </div>
          </button>
        </div>
      </div>
      {transcriptionBar && (
        <TranscriptionComponent transcription={textTranscript} />
      )}
    </div>
  )
}

export default DialComponents