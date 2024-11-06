import swaggerConfig from  './swaggerConfig.js'
import {Rucula} from 'https://cdn.jsdelivr.net/gh/reginaldo-marinho/rucula-js@desenv/dist/Rucula.js'

export let R = (() => {
    
        
    return {
        listenNode:() =>{
            document.addEventListener('DOMContentLoaded', () => {
                lisen()
            });
        }
    }

    function lisen() {

            let rucula

            SwaggerUIBundle({
                spec: swaggerConfig,
                dom_id: '#swagger-ui',
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                layout: "BaseLayout",
                onComplete: function(e) {

                    let targetNode = document.getElementById("swagger-ui")
                    
                    const config = { childList: true, subtree: true };

                    const callback = (mutationList, observer) => {
                        for (const mutation of mutationList) {
                            if (mutation.type === "childList" ) {
                                                                
                                if((mutation.target.classList.contains("opblock-body"))  && mutation.previousSibling != null) {
                                    

                                    let target = mutation.target

                                    let btnRucula = target.querySelector(".btn.try-out__btn.btn-rucula")
                                    let method = target.parentNode.parentNode.querySelector('.opblock-summary-method').textContent
                                    
                                    if(btnRucula){
                                        return
                                    }
                                    if(method === "GET" || method === "DELETE"){
                                        return
                                    }

                                    let btn = target.querySelector(".btn.try-out__btn")
                                                                                                        
                                    let bntRucula = btn.cloneNode(true)
                                    bntRucula.classList.add('btn-rucula')
                                    bntRucula.textContent = "Rucula"
                                    btn.after(bntRucula)
                                    
                                    let newId = `__${Date.now().toString()}` 
                                    
                                    let container = target.querySelector('.parameters-container')

                                    container.id = newId
                                    container.style.padding = "3px"

                                    bntRucula.addEventListener('click',() => {

                                        btn.click()

                                        let code = target.querySelector("textarea.body-param__text")
                                        let objectFrame = JSON.parse(code.textContent)

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
                                        
                                        rucula.event.on('rucula.load',() => {
                                            rucula.elementRucula.querySelector(`#${rucula.P}r-a-reload`).className = 'r-display-none'
                                            rucula.elementRucula.querySelector(`#${rucula.P}alter-theme`).className = 'r-display-none'                                            
                                            document.querySelector(`#${newId} .r-head.r-read-new.r-facede-action.top`).innerHTML = ""
                                        })

                                        rucula.create();

                                        let event
                                        if(method === "POST") event = 'r-a-save'
                                        if(method === "PUT") input.crud = 'r-a-alter'
                                        if(method === "DELETE") input.crud = 'r-a-delete'

                                        rucula.event.on('r-a-save',() => {
                                            target.querySelector('.btn.execute').click()
                                            code.value = JSON.stringify(rucula.object())
                                        })

                                        let executeWrapper = target.querySelector('.execute-wrapper')
                                        executeWrapper.style.display = 'none'
                                    })
                                }
                            }
                        }
                    }

                    const observer = new MutationObserver(callback);

                    observer.observe(targetNode, config);

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
                                    description: key
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
                },
                
                requestInterceptor: (request) => {
                    rucula.loader.enable()
                },

                responseInterceptor: (repsonse) => {
                    setTimeout(() => {
                        rucula.loader.disable()
                        rucula.popup.error({
                            text:repsonse.statusText, 
                            timeout:2000, 
                            disableadFooter:true
                        })
                        
                    },1000)
                },
            })

    }   
})()
