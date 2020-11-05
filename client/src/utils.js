import React from 'react'
import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST;
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export class ServerApi extends React.Component {

    static getServerHost() {
        return API_HOST;
    }

    static getToken() {
        return API_TOKEN;
    }

    static async getDrivers() {
        const list = await axios({
            method: 'get',
            url: this.getServerHost() + '/driver/all',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            }
        });
        return list;
    }

    static async getDriver(id) {
        const item = await axios({
            method: 'get',
            url: this.getServerHost() + '/driver/id/' + id,
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            }
        });
        return item;
    }

    static async deleteDriver(id) {
        const item = await axios({
            method: 'delete',
            url: this.getServerHost() + '/driver/del',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            },
            data: {id}
        });
        return item;
    }

    static async setDriver(dataParam) {
        let saved;
        if (typeof dataParam.id != 'undefined' && dataParam.id > 0) {
            saved = await axios({
                method: 'put',
                url: this.getServerHost() + '/driver/edit',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                },
                data: dataParam
            });
        } else {
            saved = await axios({
                method: 'post',
                url: this.getServerHost() + '/driver/add',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                },
                data: dataParam
            });
        }
        return saved;
    }

    static async getRoutes() {
        const list = await axios({
            method: 'get',
            url: this.getServerHost() + '/route/all',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            }
        });
        return list;
    }

    static async getRoute(id) {
        const item = await axios({
            method: 'get',
            url: this.getServerHost() + '/route/id/' + id,
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            }
        });
        return item;
    }

    static async setRoute(dataParam) {
        let saved;
        if (typeof dataParam.id != 'undefined' && dataParam.id > 0) {
            saved = await axios({
                method: 'put',
                url: this.getServerHost() + '/route/edit',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                },
                data: dataParam
            });
        } else {
            saved = await axios({
                method: 'post',
                url: this.getServerHost() + '/route/add',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                },
                data: dataParam
            });
        }
        return saved;
    }

    static async deleteRoute(id) {
        const item = await axios({
            method: 'delete',
            url: this.getServerHost() + '/route/del',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            },
            data: {id}
        });
        return item;
    }

    static async scheduleGenerator() {
        const schedule = await axios({
            method: 'post',
            url: this.getServerHost() + '/schedule/generate',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            },
            data: {}
        });

        return schedule;
    }

    static async getSchedule() {
        const items = await axios({
            method: 'get',
            url: this.getServerHost() + '/schedule/all',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            },
        });

        return items;
    }

}