import http from "./http-common";

class NotesService {
    getAll() {
        return http.get("/notes");
    }

    get(id) {
        return http.get(`/note/${id}`);
    }

    getNotesByCategory(id) {
        return http.get(`/note/folder/${id}`);
    }

    count() {
        return http.get(`/notes/count`);
    }

    create(data) {
        return http.post("/note/create", data);
    }

    update(id, data) {
        return http.put(`/note/update/${id}`, data);
    }

    updateFolder(id, data) {
        return http.put(`/note/update/folder/${id}`, data);
    }

    delete(id) {
        return http.delete(`/note/delete/${id}`);
    }

    getBookMarks(searchParams) {
        return http.get(`/notes/bookmarks`);
    }

    setTitle(id, data) {
        return http.put(`/note/name/${id}`, data);
    }

    setBookmark(id, data) {
        return http.put(`/note/bookmark/${id}`, data);
    }

    search(val, options){
        return http.get(`/search/${val}`)
    }

    addRecent(id){
        return http.post(`/note/addrecent/${id}`);
    }

    recent(id){
        return http.post(`/notes/recent`);
    }

    setLocked(id, data){
        return http.put(`/note/lock/${id}`, data);
    }
}

export default new NotesService();
