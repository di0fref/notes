import http from "./http-common";

class FolderService {

    url = "http://localhost:8000/api";

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
        return http.put(`/folder/${id}`, data);
    }

    delete(id) {
        return http.delete(`/folder/${id}`);
    }

    notesByFolderId(id) {
        return http.get(`/notes/folder/${id}`);
    }



    /**************************************** */

    fetchJson = (url) => fetch(url,{

        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRUaE1WaUdxOU9XTkRjNTI2eldFTiJ9.eyJpc3MiOiJodHRwczovL2Rldi1sMnZ0LTc5MS5ldS5hdXRoMC5jb20vIiwic3ViIjoiaE1ZZFFsb3JZS2hHbWxwNWZSSE5DcE9SZjBVR3M3V2hAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLmZhaGxzdGFkLnNlIiwiaWF0IjoxNjQwMDQwMjg2LCJleHAiOjE2NDAxMjY2ODYsImF6cCI6ImhNWWRRbG9yWUtoR21scDVmUkhOQ3BPUmYwVUdzN1doIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.ilEf0d5rvpLt_GoCy-wHYGhpyeEB7S0qzTFAwxW2Bb7wzFjQ68wBi3BTTkog6JCf6KeoisKPwlV_0J2duqz29uqEU0C8RNGHtf6sQ4L_YcgtBNC-6lQJrl3qwzXXD8RDA5NSXnXuije12XT9H3oHOiFlbYxQpRsbOJT9JwRNGB4JUCPxLkFIFaskw7UMEgyvJVdgGRNlGTAvd44ebYEXx2twALqkN4RL0ksrRWrlc26WBXryKNhzvyj7ktQnUjQbCMjyKKXdTXGOmlE_6d6ajgaECV0eptYe3V3eUyQVvpTvucep_As4YmnN5c4NUY4u433CQ9P0la24q1h-R3wT8w"
        }


    }).then((r) => r.json());

    getBread = (folder_id) => {
        return this.fetchJson(`${this.url}/folders/p/${folder_id}`).then(
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
        return this.fetchJson(`${this.url}/folders/parent/${parent}`).then(
            (items) => Promise.all(
                items.map(this.getResultAux)
            )
        );
    }

    getNotesCount = (folder) => {
        return this.fetchJson(`${this.url}/notes/count/${folder}`).then(
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
        return this.fetchJson(`${this.url}/notes/folder/${folder}`,{}).then();
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
