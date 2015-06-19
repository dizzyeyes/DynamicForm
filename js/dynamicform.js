function dynamicForm(title,viewer,id){
    var scope = this;
    if(id==undefined) id="form-new";
    this.viewer=viewer;
    this.initForm(id);
    this.visible=false;   
    this.fadeTool= new fadeInOutTool();
    this.enabled = true;
    this.title=title;
    
    document.dynamicform = this;
   
    document.addEventListener( 'mousemove', this.onMouseMove, false );
} 

dynamicForm.prototype.onMouseMove = function(event)
{
    this.dynamicform.fadeTool.onMoveDiv(event);
}

dynamicForm.prototype.initForm = function(id){
    this.div = document.createElement("div");  
    this.div.id=id;  
    this.div.className="bs-form";
    this.div.style.display="none";  
    this.div.style.zIndex=100;
    this.div.style.position="absolute";
    document.body.appendChild(this.div);   
}


dynamicForm.prototype.fillForm = function(dataJson){
        var form=this;
        $('#'+this.div.id+'').bootstrapForm({
            width: 340,
            data: dataJson,
            onSelect: function(name) {
                if(name==undefined) return;
                form.process(name);
                form.hide();
            }
        });
}
dynamicForm.prototype.hide = function()
{                
    this.div.style.display="none";
    this.clearForm();
    this.visible=false;
}
dynamicForm.prototype.selectobj = function(obj)
{          
    this.obj=obj;
}
dynamicForm.prototype.show = function(x,y){
    if(this.enabled==false) return;
    this.clearForm();
    var data=this.getJsonDataofForm();
    this.fillForm(data);
    this.fillActioin();
    this.fadeTool.fadeIn(this.div);
    if(x==undefined)
        this.fadeTool.MoveFloatLayer(this.div.id);
    else
        this.fadeTool.MoveFloatLayer(this.div.id,x,y);
    this.visible=true;
}
dynamicForm.prototype.clearForm = function (){
    this.clearDiv(this.div);
 }
 
dynamicForm.prototype.clearDiv = function (div){
    var chld = div.children;
    for(var item=0;item<chld.length;item++)
    {
        div.removeChild(chld[item]);
    }
 }
dynamicForm.prototype.getJsonDataofForm = function()
{
    var dataJson="[]";
    switch(this.div.id)
    {
        case 'form-new':
            dataJson=this.getJsonDataofFormNew();
        break;
    }
    return dataJson;
}

dynamicForm.prototype.getJsonDataofFormNew = function()
{
    var formFirstlist=new Array();
    formFirstlist.push({
                        name: 'form_input_ID',
                        title: 'ID&nbsp;&nbsp;&nbsp;&nbsp;',
                        holder: '请输入ID...',
                        divName: 'input',
                        type: 'text',
                        className: 'span4'
                    });
    formFirstlist.push({
                        name: 'form_input_Name',
                        title: '名称&nbsp;&nbsp;&nbsp;&nbsp;',
                        holder: '请输入名称...',
                        divName: 'input',
                        type: 'text',
                        className: 'span4'
                    });
    formFirstlist.push({
                        name: 'form_input_Info',
                        title: '信息&nbsp;&nbsp;&nbsp;&nbsp;',
                        holder: '请输入信息...',
                        divName: 'textarea',
                        type: 'textarea',
                        className: '"span4 area"'
                    });
    var buttonlist=new Array();
    buttonlist.push({
                    name: 'form_button_ok',
                    title: '确定',
                    divName: 'button',
                    className: '"btn btn-info"'
                });
    buttonlist.push({
                    name: 'form_button_cancel',
                    title: '取消',
                    divName: 'button',
                    className: '"btn btn-warning"'
                });
    formFirstlist.push({
                    name: 'form_buttons',
                    divName: 'buttons',
                    children: buttonlist,
                });
   var dataJson= [{
                    name: 'menu_edit',
                    title: this.title,
                    divName: 'div',
                    children: formFirstlist,
                    className: '"well span4"'
                }];
    return dataJson;
}