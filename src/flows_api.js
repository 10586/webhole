import {API_BASE} from './Common';

function token_param(token) {
    return token ? ('&token='+token) : '';
}

export const API={
    load_replies: (pid,token)=>{
        return fetch(
            API_BASE+'/api.php?action=getcomment'+
            '&pid='+pid+
            token_param(token)
        )
            .then((res)=>res.json())
            .then((json)=>{
                if(json.code!==0)
                    throw new Error(json);
                return json;
            });
    },

    set_attention: (pid,attention,token)=>{
        let data=new URLSearchParams();
        data.append('token',token);
        data.append('pid',pid);
        data.append('switch',attention ? '1' : '0');
        return fetch(API_BASE+'/api.php?action=attention', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data,
        })
            .then((res)=>res.json())
            .then((json)=>{
                if(json.code!==0) {
                    if(json.msg && json.msg==='已经关注过辣') {}
                    else {
                        if(json.msg) alert(json.msg);
                        throw new Error(json);
                    }
                }
                return json;
            });
    },

    get_list: (page,token)=>{
        return fetch(
            API_BASE+'/api.php?action=getlist'+
            '&p='+page+
            token_param(token)
        )
            .then((res)=>res.json())
            .then((json)=>{
                if(json.code!==0)
                    throw new Error(json);
                return json;
            });
    },

    get_search: (pagesize,keyword,token)=>{
        return fetch(
            API_BASE+'/api.php?action=search'+
            '&pagesize='+pagesize+
            '&keywords='+encodeURIComponent(keyword)+
            token_param(token)
        )
            .then((res)=>res.json())
            .then((json)=>{
                if(json.code!==0)
                    throw new Error(json);
                return json;
            });
    },

    get_single: (pid,token)=>{
        return fetch(
            API_BASE+'/api.php?action=getone'+
            '&pid='+pid+
            token_param(token)
        )
            .then((res)=>res.json())
            .then((json)=>{
                if(json.code!==0)
                    throw new Error(json);
                return json;
            });
    },

    get_attention: (token)=>{
        return fetch(
            API_BASE+'/api.php?action=getattention'+
            token_param(token)
        )
            .then((res)=>res.json())
            .then((json)=>{
                if(json.code!==0)
                    throw new Error(json);
                return json;
            });
    }
};