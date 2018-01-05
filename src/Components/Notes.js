import React from 'react';

import {loadCollection, db} from '../database/data'

import Note from './Note';

class Notes extends React.Component {
    state = {
        //笔记集合对象
        entities: []
    }

    constructor(props) {
        super(props);
        this.getInitialData();
    }

    // 初始化笔记数据
    getInitialData() {
        loadCollection('notes')
            .then((collection) => {
                const entities = collection.chain()
                    .find()
                    .simplesort('meta.created', 'isdesc')//$loki
                    .data();
                this.setState({
                    entities: entities
                });
                console.log(entities)
            })
    }

    //创建新的笔记
    createEntity = () => {
        loadCollection('notes')
            .then((collection) => {
                const entity = collection.insert({
                    body: "测试数据" + new Date().getTime()
                });
                db.saveDatabase();
                //重新获取最新的笔记数据
                this.getInitialData();
            })


    }
    //删除笔记
    destroyEntity=(entity)=>{
        const _entities=this.state.entities.filter((_entity)=>{
            return _entity.$loki!==entity.$loki;
        })
        this.setState({
            entities:_entities
        });
        loadCollection('notes')
            .then((collection)=>{
                collection.remove(entity);
                db.saveDatabase()

        })
    }


    render() {
        //localStorage中笔记集合对象
        let entitys = this.state.entities;
        //笔记组件集合(React组件)
        //这里需要将<Node />组件返回,所以不能使用forEach循环,forEach循环的返回值是undefined
        let noteItems = entitys.map((entity) => {
            //console.log(entity);
            return <Note
                key={ entity.$loki }
                entity={ entity }
                destroyEntity={this.destroyEntity}
            />
        });
        return (
            <div className="ui container notes">
                <h4 className="ui horizontal divider header">
                    <i className="paw icon"></i>
                    React.js练手项目 _ Notes App
                </h4>
                <button href="javascript:void(0);"
                        onClick={this.createEntity}
                        className="ui right floated basic violet button">
                    添加笔记
                </button>
                <div className="ui divided items">
                    {noteItems}
                    {
                        !entitys.length &&
                        <span className="ui small disabled header">
                            还没有笔记,请按下"添加笔记"按钮.
                        </span>
                    }
                </div>
            </div>
        )
    }
}

export default Notes;