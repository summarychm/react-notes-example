import React from 'react';

class Editor extends React.Component{
    render(){
        return(
            <div className="ui form">
                <div className="field">
                    <textarea rows="5" placeholder={"写点东西"} />
                </div>
            </div>
        )
    }
}

export default Editor;