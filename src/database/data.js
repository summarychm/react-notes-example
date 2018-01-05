import Loki from 'lokijs';

const dataName = 'notes';
export const db = new Loki(dataName, {
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 1000 * 3,
    persistenceMethod: 'localStorage'
});

const databaseInitialize = () => {
    const notes = db.getCollection(dataName) || db.addCollection(dataName);
}

//获取指定集合
export const loadCollection = (collectionName) => {
    return new Promise((resolve) => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(collectionName) || db.addCollection(collectionName);
            resolve(_collection);
        })
    })
}
