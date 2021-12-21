import http from "./http-common";

class NotesService {
    getAll() {
        return http.get("/notes");
    }

    get(id) {
        return http.get(`/notes/${id}`);
    }

    getNotesByCategory(id) {
        return http.get(`/note/folder/${id}`);
    }

    count() {
        return http.get(`/notes/count`);
    }

    create(data) {
        return http.post("/notes", data);
    }

    update(id, data) {
        return http.put(`/notes/${id}`, data);
    }

    delete(id) {
        return http.delete(`/notes/${id}`);
    }

    getBookMarks() {
        return http.get(`/notes/bookmarks`);
    }

    search(val, options){
        return http.get(`/search/${val}`)
    }

    addRecent(id){
        return http.post(`/notes/addrecent/${id}`);
    }

    recent(id){
        return http.post(`/notes/recent`);
    }

    trash(id){
        return http.put(`/notes/trash/${id}`);
    }

    getTrash(){
        return http.get(`/notes/trash`);
    }
}

export default new NotesService();
