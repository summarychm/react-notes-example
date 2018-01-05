import React from 'react';
import Editor from './Editor'

class Note extends React.Component {
    state = {
        //笔记对象
        entity: this.props.entity,
        //笔记内容对象
        body: this.props.entity.body,
        //笔记更新时间(或创建时间)
        updated: this.props.entity.meta.updated || this.props.entity.meta.created,
    }

    header() {
        return this.state.body;
    }

    render() {
        console.log("state", this.state.entity);
        return (
            <div className="item">
                <div className="meta">
                    {this.state.updated}
                </div>
                <div className="content">
                    <div className="header">
                        {this.header()}
                    </div>
                    <div className="extra">
                        <Editor/>
                        {this.state.body.length}字
                        <i className="right floated trash outline icon"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default Note;