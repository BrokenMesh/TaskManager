window.habitStorage = (() => {
    let db = null;

    function openDB() {
        return new Promise((resolve, reject) => {
            if (db) { resolve(db); return; }
            const req = indexedDB.open('HabitTrackerDB', 1);
            req.onupgradeneeded = e => {
                const d = e.target.result;
                if (!d.objectStoreNames.contains('habits')) {
                    d.createObjectStore('habits', { keyPath: 'id' });
                }
                if (!d.objectStoreNames.contains('entries')) {
                    const es = d.createObjectStore('entries', { keyPath: 'id' });
                    es.createIndex('habitId', 'habitId', { unique: false });
                }
            };
            req.onsuccess = e => { db = e.target.result; resolve(db); };
            req.onerror = e => reject(e.target.error);
        });
    }

    async function getAll(storeName) {
        const d = await openDB();
        return new Promise((resolve, reject) => {
            const req = d.transaction(storeName, 'readonly').objectStore(storeName).getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function put(storeName, item) {
        const d = await openDB();
        return new Promise((resolve, reject) => {
            const req = d.transaction(storeName, 'readwrite').objectStore(storeName).put(item);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function remove(storeName, id) {
        const d = await openDB();
        return new Promise((resolve, reject) => {
            const req = d.transaction(storeName, 'readwrite').objectStore(storeName).delete(id);
            req.onsuccess = () => resolve();
            req.onerror = () => reject(req.error);
        });
    }

    async function getByIndex(storeName, indexName, value) {
        const d = await openDB();
        return new Promise((resolve, reject) => {
            const req = d.transaction(storeName, 'readonly')
                         .objectStore(storeName)
                         .index(indexName)
                         .getAll(value);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    return { openDB, getAll, put, remove, getByIndex };
})();
