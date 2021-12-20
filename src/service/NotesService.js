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
        return http.post("/notes/create", data);
    }

    update(id, data) {
        return http.put(`/notes/update/${id}`, data);
    }

    updateFolder(id, data) {
        return http.put(`/notes/update/folder/${id}`, data);
    }

    delete(id) {
        return http.delete(`/notes/delete/${id}`);
    }

    getBookMarks() {
        return http.get(`/notes/bookmarks`);
    }

    setTitle(id, data) {
        return http.put(`/notes/name/${id}`, data);
    }

    setBookmark(id, data) {
        return http.put(`/notes/bookmark/${id}`, data);
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

    setLocked(id, data){
        return http.put(`/notes/lock/${id}`, data);
    }
    trash(id){
        return http.put(`/notes/trash/${id}`);
    }

    getTrash(){
        return http.get(`/notes/trash`);
    }
}

export default new NotesService();
