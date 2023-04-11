import http from "http";
class AdminRequestsService {
    constructor() {
        this.createBlock = async () => {
            const promise = new Promise((resolve, reject) => {
                try {
                    http.get("http://localhost:3000/get-schedule", (res) => {
                        let data = "";
                        res.on("data", (chunk) => {
                            data = data + chunk;
                        });
                        res.on("end", () => {
                            const result = JSON.parse(data);
                            resolve(result);
                        });
                        res.on("error", (err) => {
                            console.log(err);
                        });
                    });
                }
                catch (error) {
                    reject(error);
                }
            });
            return promise;
        };
    }
}
export default new AdminRequestsService();
//# sourceMappingURL=AdminRequests.js.map