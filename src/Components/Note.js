import React from 'react';
import Editor from './Editor';

//------第三方package----------
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/zh-cn';

import {loadCollection, db} from '../database/data';

moment.locale('zh-CN');

class Note extends React.Component {
    state = {
        //笔记对象
        entity: this.props.entity,
        //笔记内容对象
        body: this.props.entity.body,
        //笔记更新时间(或创建时间)
        updated: this.props.entity.meta.updated || this.props.entity.meta.created,
        open: false,
        destroyEntity:this.props.destroyEntity
    }

    //修改时间美化
    updated() {
        return moment(this.state.updated).fromNow();
    }

    //笔记标题格式化
    header() {
        return _.truncate(this.state.body, {length: 30}) || "暂无内容...";
    }

    words() {
        return this.state.body.length;
    }

    //切换显示编辑框的显隐状态
    toggle = () => {

        this.setState((preState) => {
            return {
                open: !preState.open
            }
        });
    }

    //编辑node实例
    updateEntity=(event)=>{
        const _body=event.target.value;
        this.setState({
            body:_body
        });
        loadCollection('notes')
            .then((collection)=>{
                const entity=this.state.entity;
                entity.body=_body;
                collection.update(entity);
                db.saveDatabase();
            })

    }

    render() {
        // console.log("state", this.state.entity);
        return (
            <div className="item">
                <div className="meta">
                    {this.updated()}
                </div>
                <div className="content">
                    <div className="header" onClick={this.toggle}>
                        {this.header()}
                    </div>
                    <div className="extra">
                        {
                            this.state.open && <Editor
                                entity={this.state.entity}
                                updateEntity={this.updateEntity}
                            />
                        }
                        {this.words()}字
                        {this.state.open && <i
                            className="right floated trash outline icon"
                            onClick={()=>this.state.destroyEntity(this.state.entity)}
                        />}
                    </div>
                </div>
            </div>
        )
    }
}

//moment 处理时间
//lodash 截取标题
export default Note;