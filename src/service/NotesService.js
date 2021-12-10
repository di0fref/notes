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
    saveText(id, data){
        return http.put(`/note/save/${id}`, data);
    }
}

export default new NotesService();
