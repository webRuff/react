export default {
    toString(obj){
        let str = '';
        for (let i in obj) {
            str+= i + '=' + obj[i] + ';'
        }
        return str;
    },

    fromString(str){
        const obj = {};
        str.split(';').forEach( pair =>{
            if (!pair) { return }
            obj[pair.split('=')[0]] = pair.split('=')[1];
        });
        return obj;
    }
}