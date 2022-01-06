import http from "./http-common";
import api_config from "./config";
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
        return http.post("/folders", data);
    }

    update(id, data) {
        return http.put(`/folders/${id}`, data);
    }

    delete(id) {
        return http.delete(`/folder/${id}`);
    }

    notesByFolderId(id) {
        return http.get(`/notes/folder/${id}`);
    }

    tree(){
        return http.get(`/tree`);
    }

    /**************************************** */

    fetchJson = (url) => fetch(url,{

        headers: {
            "Content-type": "application/json",
            "token": localStorage.getItem("api_token"),
        }


    }).then((r) => r.json());

    getBread = (folder_id) => {
        return this.fetchJson(`${api_config.url}/folders/p/${folder_id}`).then(
            (parent) => Promise.all(
                parent.map(this.getBreadAux)
            )
        );
    }

    getBreadAux = async (t = {}) => {
        const parent = await this.getBread(t.parent_id)
        return {
            ...t,
            parent,
        };
    };

    getResult = (parent) => {
        return this.fetchJson(`${api_config.url}/folders/parent/${parent}`).then(
            (items) => Promise.all(
                items.map(this.getResultAux)
            )
        );
    }

    getNotesCount = (folder) => {
        return this.fetchJson(`${api_config.url}/notes/count/${folder}`).then(
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
        return this.fetchJson(`${api_config.url}/notes/folder/${folder}`,{}).then();
    }

    getNoteAux = async (t = {}) => ({
        ...t,
        items: await this.getNoteResult(t.id),
    });

    getResultAux = async (t = {}) => {

        const folders = await this.getResult(t.id)
        // const c = await this.getNotesCount(t.id)
        const notes = await this.getNoteResult(t.id)
        let items = folders.concat(notes);
        return {
            ...t,
            items,
            // c
        };
    };
    /******************************************* */
}

export default new FolderService();
