'use client'
import { useState, useEffect, useRef } from 'react'
import { redirect } from 'next/navigation'
import React from 'react'
import Image from 'next/image'

const DialComponents = () => {
  const [isMuted, setIsMuted] = useState(false)
  const [isDeafened, setIsDeafened] = useState(false)
  const [transcript, setTranscript] = useState('');
  const [microphoneIdle, setMicrophoneIdle] = useState(false);
  const audioStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const NOISE_THRESHOLD = 0.15;
  const SILENCE_THRESHOLD = 0.15;

  const getMicrophoneMedia = async () => {
    try {
      // Ask permission to use the microphone
      audioStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Record audio
      mediaRecorderRef.current = new MediaRecorder(audioStreamRef.current);

      // You can start recording or handle the mediaRecorder as needed

      // Initialize Speech Recognition
      if (typeof window !== 'undefined') {
        const SpeechRecognition =
          window.SpeechRecognition ||
          window.webkitSpeechRecognition;

        if (SpeechRecognition) {
          recognitionRef.current = new SpeechRecognition();
          recognitionRef.current.continuous = true;
          recognitionRef.current.interimResults = true;
          recognitionRef.current.onresult = (event) => {
            const currentTranscript = Array.from(event.results)
              .map((result) => result[0].transcript)
              .join('');
            setTranscript(currentTranscript);
          };

          // Handle the end of speech recognition
          recognitionRef.current.onend = () => {
            recognitionRef.current.isListening = false; // Reset the flag when recognition ends
            console.log('Speech recognition ended.');
          };
          console.log('Speech Recognition Supported');
        } else {
          console.log('Speech Recognition Not Supported');
        }
      }

      // Setup Audio Context for noise detection
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      // Create analyser node
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;

      // Connect microphone stream to analyser
      const source = audioContext.createMediaStreamSource(audioStreamRef.current);
      source.connect(analyser);

      // Start noise monitoring
      monitorNoise();

    } catch (error) {

      console.error('Error accessing microphone:', error);
    }
  };


  const monitorNoise = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const checkNoise = () => {
      if (!analyserRef.current) return;
      analyserRef.current.getByteFrequencyData(dataArray);

      // Calculate average volume
      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength / 255;

      // Auto start/stop based on noise level
      console.log('Average:', average);
      if (average > NOISE_THRESHOLD && !isMuted) {
        startListening();
      } else if (average < SILENCE_THRESHOLD && recognitionRef.current && recognitionRef.current.isListening) {
        console.log('Stopped listening due to silence.');
        stopListening();
      }

      // Continue monitoring if context exists
      if (audioContextRef.current) {
        requestAnimationFrame(checkNoise);
      }
    };

    checkNoise();
  };

  const startListening = async () => {
    if (recognitionRef.current) {
      // Check if recognition is already listening
      if (recognitionRef.current.isListening) {
        console.log('Speech recognition is already running.');
        return; // Exit if already listening
      }
    
      try {
        recognitionRef.current.start();
        recognitionRef.current.isListening = true; // Set a flag to indicate it's listening
        setMicrophoneIdle(!microphoneIdle);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }

  };


  const stopListening = () => {
    if (recognitionRef.current && recognitionRef.current.isListening) {
      try {
        recognitionRef.current.stop();
        recognitionRef.current.isListening = false; // Reset the flag
        setMicrophoneIdle(!microphoneIdle);
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    } else {
      console.log('Speech recognition is not currently running.');
    }
  };

  // const getMicrophoneMedia = async () => {
  //   try {
  //     // Ask permission to use the microphone
  //     audioStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

  //     // Record audio
  //     mediaRecorderRef.current = new MediaRecorder(audioStreamRef.current);
  //     // You can start recording or handle the mediaRecorder as needed
  //   } catch (error) {
  //     console.error('Error accessing microphone:', error);
  //   }
  // }

  const handleMuteMic = async () => {
    await setIsMuted((prevMuted) => {
      const newMuted = !prevMuted

      if (newMuted) {
        if (audioStreamRef.current) {
          audioStreamRef.current.getAudioTracks().forEach(track => track.enabled = false);
        }

        stopListening();
      } else {
        if (audioStreamRef.current) {
          audioStreamRef.current.getAudioTracks().forEach(track => track.enabled = true);
        }
        startListening();
      }

      return newMuted
    })
  }

  const handleHangUp = () => {
    // Stop microphone
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
    }

    // Stop recording
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    stopListening();

    // Cleanup audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null; // Set to null to avoid closing again
    }

    // go to disable page and go to specific page
    redirect('/dashboard/calls')
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
        console.log('Chat History')
        break
      case 4:
        console.log('Full Screen')
        break
    }
  }

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
  const character = {
    model_id: 1,
    name: 'Zeta',
    image: '/assets/images/zeta.png',
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nunc nec nisl aliquam lacinia nec nec nisl. Nulla at nunc nec nisl aliquam...."
  }

  useEffect(() => {
    getMicrophoneMedia();

    return () => {
      // Cleanup if audio stream is not used
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
      }

      // Stop speech recognition
      stopListening();

      // Cleanup audio context
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null; // Set to null to avoid closing again
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="absolute">
        <div className="flex flex-col items-center">
          <Image
            src={character.image}
            alt={character.name}
            width={300}
            height={300}
            className="w-32 rounded-full shadow-chara-image"
          ></Image>

          <div className="flex mt-10 w-8/12">
            <p className="text-center font-bold text-md">{character.text}</p>
          </div>
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
  )
}

export default DialComponents