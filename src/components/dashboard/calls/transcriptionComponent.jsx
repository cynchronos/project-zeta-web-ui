import React from 'react'
import DialogComponent from '@/components/chats/messages/dialogComponent'

const TranscriptionComponent = ({transcription}) => {
  return (
    <div className="flex w-4/12 flex-col h-full bg-transcription-bg pt-5 rounded-xl">
        <div className="flex flex-col w-full h-full">
          <div className="flex w-full h-content justify-center items-center pt-5 pb-3">
            <div className="w-fit h-fit bg-transcription-title px-5 py-2 rounded-lg font-bold">
              <h2>Transcriptions</h2>
            </div>
          </div>
          <DialogComponent dialogs={transcription} />
        </div>
    </div>
  )
}

export default TranscriptionComponent