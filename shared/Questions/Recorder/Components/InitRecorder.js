import React from 'react'

const InitRecorder = ({key}) =>(
    <div key={key} className={`initial-container`}>
        <div className="row">
            <div className="col-md-2">
                <button type={`button`} className={`initial-record-btn`}><img
                    src={`/img/svg/microphone.svg`}/></button>
            </div>
            <div className="col-md-10">
                <div className={`initial-info`}>Have a question about the show?<br />
                    Leave us audio feedback and you may get your answer on the air
                </div>
            </div>
        </div>
    </div>
)
export default InitRecorder;