
dynamicForm.prototype.fillActioin = function (){
    var okButton = document.getElementById('form_button_ok');
    var cancelButton = document.getElementById('form_button_cancel');
    var titleButton = document.getElementById('form_title_new');
    okButton.parent = this;
    cancelButton.parent = this;
    titleButton.parent = this;
    
    okButton.onclick = this.process;
    cancelButton.onclick = this.cancel;
    titleButton.onmousedown = this.DragTitle;
    titleButton.onmouseup = this.unDragTitle;
    titleButton.onmouseover = this.focusTitle;
    titleButton.onmouseout = this.unfocusTitle;
 }
dynamicForm.prototype.DragTitle = function(event)
{
    this.style.cursor="move";
    this.parent.fadeTool.clickOnDiv(this.parent.div,event);
    // console.log('点击: ');
}
dynamicForm.prototype.focusTitle = function(event)
{
    this.style.cursor="move";
    // console.log('移动: ');
}
dynamicForm.prototype.unfocusTitle = function(event)
{
    this.style.cursor="default";
    // console.log('进入: ');
}
dynamicForm.prototype.unDragTitle = function()
{
    this.parent.fadeTool.onUpDiv();
    this.style.cursor="default";
    // console.log('释放: ');
}
dynamicForm.prototype.defaultStyle = function(event)
{
    if(event.type=='blur')
        this.isFocused=false;
    if(this.isFocused==true) return;
    this.style.border = "#ccc 1px solid";
}
dynamicForm.prototype.prettyStyle = function(event)
{
    if(event.type=='focus')
        this.isFocused=true;
    this.style.border = "#56b4ef 1px solid";
}
dynamicForm.prototype.process = function()
{
    var outputobj=this.parent.div.getElementsByTagName('input');
    var outputobjtextarea=this.parent.div.getElementsByTagName('textarea');
    var data = {};
    for(var item=0;item<outputobj.length;item++)
    {
        var inputItem = outputobj.item(item);
        if(inputItem.value=="")
        {
            inputItem.style.border = "2px solid #ed2d11";
            inputItem.placeholder = "不能为空";
            inputItem.onblur = this.parent.defaultStyle;
            inputItem.onmouseout = this.parent.defaultStyle;
            inputItem.onmouseover = this.parent.prettyStyle;
            inputItem.onfocus = this.parent.prettyStyle;
            return;
        }
        data[inputItem.name] = inputItem.value;
    }
    for(var item=0;item<outputobjtextarea.length;item++)
    {
        var inputItem = outputobjtextarea.item(item); 
        if(inputItem.value=="")
        {
            inputItem.style.border = "1px solid #ed2d11";
            inputItem.placeholder = "不能为空";
            inputItem.onblur = this.parent.defaultStyle;
            inputItem.onmouseout = this.parent.defaultStyle;
            inputItem.onmouseover = this.parent.prettyStyle;
            inputItem.onfocus = this.parent.prettyStyle;
            return;
        }
        data[inputItem.name] = inputItem.value;
    }
    var output = {};
    output.title = this.parent.title;
    output.data = data;
    console.log('处理: ',output);
}
dynamicForm.prototype.cancel = function()
{
    this.parent.hide();
    console.log('取消: ');
}