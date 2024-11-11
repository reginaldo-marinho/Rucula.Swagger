import {Rucula} from 'https://cdn.jsdelivr.net/gh/reginaldo-marinho/rucula-js@v0.1.0/dist/Rucula.js'

document.addEventListener('DOMContentLoaded', () => {
    let swaggerUi = document.getElementById("swagger-ui")

    const config = { childList: true, subtree: true };

    function callback(mutationList, observer){

        for (const mutation of mutationList) {
                           
            let target = mutation.target
            
            let className = target.className
            if( className === "opblock-body" || className === "opblock opblock-post is-open" || className === "opblock opblock-put is-open"){
                    
                let btnRucula = target.querySelector(".btn.try-out__btn.btn-rucula")
                    
                if(btnRucula){
                    return
                }

                let method = className === "opblock-body" ? 
                    target.parentNode?.previousSibling?.querySelector('.opblock-summary-method').textContent : 
                    target.querySelector('.opblock-summary-method').textContent
                    
                if(method === "GET" || method === "DELETE" || method === undefined){
                    return
                }
                
                let btn = target.querySelector(".btn.try-out__btn")
                
                if(btn == null){
                    return
                }
                
                let bntRucula = btn.cloneNode(true)

                bntRucula.classList.add('btn-rucula')
                bntRucula.textContent = "Rucula"
                btn.after(bntRucula)
                
                let newId = `__${Date.now().toString()}` 
                
                let container = target.querySelector('.parameters-container .table-container')

                if(container == null){
                    container = target.querySelector('.parameters-container')
                }

                let div = document.createElement('div')
                div.id = newId

                container.appendChild(div)

                let rucula = null

                btn.addEventListener('click',() => {

                    let attr = bntRucula.getAttribute('disabled')
                    if(attr == null){
                        bntRucula.setAttribute('disabled', true)
                    }
                    else{
                        bntRucula.removeAttribute('disabled')
                    }
                })

                bntRucula.addEventListener('click',() => {

                    if(rucula !== null){
                        return
                    }

                    if(btn.classList.contains('cancel')){
                        bntRucula.setAttribute('disabled',true) 
                        return
                    } 

                    let exampleBody = target.querySelector(".body-param__example")
                    let objectFrame = JSON.parse(exampleBody.textContent)

                    btn.click()

                    let config = {
                        floatLabel:true,
                        environments:[{
                            description:"swagger",
                            env:"swagger"
                        }],
                        localizations:[{}]
                    }   

                    let input = createCondfiguration(objectFrame)

                    if(method === "POST") input.crud = 'c'
                    if(method === "GET") input.crud = 'r'
                    if(method === "PUT") input.crud = 'u'
                    if(method === "DELETE") input.crud = 'd'

                    rucula = new Rucula({
                        global: config,
                        window: input,
                        id: newId
                    })
                    
                    
                    let bodyParam

                    rucula.elementRucula.addEventListener('input',(()=> {
                        
                        if(bodyParam == undefined){
                            bodyParam = target.querySelector("textarea.body-param__text")
                        }
                        
                        if(bodyParam == undefined){
                            return
                        }

                        if(bodyParam == undefined){
                            return
                        }

                        var json = JSON.stringify(rucula.getFullObject())
                        
                        bodyParam.value = json           

                        triggerReactEvent(bodyParam, 'onChange');

                        function triggerReactEvent(element, eventName) {
                            
                            const reactPropsKey = Object.keys(element).find(key => key.startsWith('__reactProps$'));

                            if (reactPropsKey) {
                                const props = element[reactPropsKey];

                                if (props && typeof props[eventName] === 'function') {
                                    props[eventName]({ target: element, type: eventName });
                                } 
                            }
                        }
                    }))

                    rucula.event.on('rucula.load',() => {
                        
                        rucula.elementRucula.querySelector('#'+rucula.p('r-a-reload')).className = 'r-display-none'
                        let headerActions = document.querySelector(`#${newId} .r-head.r-read-new.r-facede-action.top`)
                        let buttons = headerActions.querySelectorAll('button')

                        for (let index = 0; index < buttons.length; index++) {
                            
                            if(index < 2) {
                                continue
                            }

                            buttons[index]?.remove()
                        }

                        let rw = rucula.elementRucula.querySelector(`.${rucula.p('r-w')}`)
                        rw.removeAttribute('style')
                        rw.style.maxHeight  = '900px'
                    })

                    rucula.create();

                    let event

                    if(method === "POST") event = rucula.p('r-a-save')
                    if(method === "PUT") event = rucula.p('r-a-alter')
                    if(method === "DELETE") event = rucula.p('r-a-delete')

                    bntRucula.setAttribute('disabled',true) 
                    
                    rucula.event.on(event,() => {                          
                        target.querySelector('.btn.execute.opblock-control__btn').click()
                    })

                    let erase = rucula.elementRucula.querySelector('#'+rucula.p('erase-window'))

                    erase.addEventListener('click',() => {

                        let ruculaForm = rucula.elementFormRucula
                        let inputs = ruculaForm.querySelectorAll("input,select,textarea")
                        inputs.forEach((element,index)  => {

                            element.value = ""
                            element.focus()
                            element.blur()

                            if(index === inputs.length -1){
                                ruculaForm.dispatchEvent(new Event('input',{bubbles: true}))
                            }
                        });
                    })
                })
            }
        }

        function createCondfiguration(objectFrame){
                        
            let input = new Object({
                        type: "crud",
                        grid:false,
                        frames: [],
                        layout:{
                            items:[]
                        },
                        button: [
                            {
                                type: "button",
                                target: "r-a-save",
                                body:"."
                            },
                            {
                                type: "button",
                                target: "r-a-alter",
                                body:"."
                            },
                            {
                                type: "button",
                                target: "r-a-delete",
                                body:"."
                            },
                            {
                                text: "⭐ GitHub",
                                type: "link",
                                link:"https://github.com/reginaldo-marinho/Rucula.Swagger"
                            },
                            {
                                text: "📚 Documentação",
                                type: "link",
                                link:"https://swagger.io/docs/open-source-tools/swagger-ui/customization/overview/"
                            },
                            {
                                text: "🔍 HTTP Status",
                                type: "link",
                                link:"https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status"
                            }
                        ]
            })
                                            
            let identity = 1

            input.layout.items.push([`_alias_${identity}`])
            
            createFrames(objectFrame,{
                    objectDto: ``,
                    alias: `_alias_${identity}`,
            })
            
            function createFrames(ob, frame, parent = "."){
                
                identity++
                
                frame.fields = []
                
                for (var [key, value] of Object.entries(ob)) {

                    if(Array.isArray(value)){
                            createFrames(value[0], cFrame(identity,key,parent, 'line'))    
                            continue
                    }

                    if(typeof value === 'object'){
                        createFrames(value,cFrame(identity, key, parent))
                        continue
                    }


                    frame.fields.push({
                        propertDto: key,
                        description: key,
                        type: typeof value === 'number' ? 'number' : 'text'
                    })
                }

                function cFrame(identity, name, parent ,type='block' ){
                    
                    input.layout.items.push([`_alias_${identity}`])

                    return {
                        objectDto: name,
                        alias: `_alias_${identity}`,
                        type:type,
                        parent:parent,
                        name:name
                    }
                }
                input.frames.push(frame)    
            }   
            
        return input
        }
    }

    const observer = new MutationObserver(callback);
    observer.observe(swaggerUi, config);
});
