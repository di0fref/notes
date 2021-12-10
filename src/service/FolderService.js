import http from "./http-common";

class FolderService {
    getAll() {
        return http.get("/folders");
    }

    get(id) {
        return http.get(`/folders/${id}`);
    }

    count() {
        return http.get(`/folders/count`);
    }

    create(data) {
        return http.post("/folder/create", data);
    }

    update(id, data) {
        return http.put(`/folder/update/${id}`, data);
    }

    delete(id) {
        return http.delete(`/folder/delete/${id}`);
    }

    notesByFolderId(id) {
        return http.get(`/notes/folder/${id}`);
    }

    updateFolder(id, data) {
        return http.put(`/folder/update/folder/${id}`, data);
    }


    /**************************************** */

    fetchJson = (url) => fetch(url).then((r) => r.json());

    getResult = (parent) => {
        return this.fetchJson(`http://localhost:4000/folders/parent/${parent}`).then(
            (items) => Promise.all(
                items.map(this.getResultAux)
            )
        );
    }

    getNotesCount = (folder) => {
        return this.fetchJson(`http://localhost:4000/notes/count/${folder}`).then(
            (c) => Promise.all(
                c.map(this.getNoteCountAux)
            )
        );
    }

    getNoteCountAux = async (t = {}) => {

        // if(t.folder_id !== null){
        //     const c = await this.getNotesCount(t.folder_id)
        //     return {
        //         ...t,
        //         c
        //     }
        // }

        return null;

    };


    getNoteResult = (folder) => {
        return this.fetchJson(`http://localhost:4000/notes/folder/${folder}`).then();
    }

    getNoteAux = async (t = {}) => ({
        ...t,
        items: await this.getNoteResult(t.id),
    });

    getResultAux = async (t = {}) => {

        const folders = await this.getResult(t.id)
        // const c = await this.getNotesCount(t.id)
        const notes = await this.getNoteResult(t.id)
        var items = folders.concat(notes);
        return {
            ...t,
            items,
            // c
        };
    };
    /******************************************* */
}

export default new FolderService();