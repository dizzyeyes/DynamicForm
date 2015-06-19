
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
dynamicForm.prototype.process = function()
{
    var outputobj=this.parent.div.getElementsByTagName('input');
    var outputobjtextarea=this.parent.div.getElementsByTagName('textarea');
    var output = new Array();
    for(var item=0;item<outputobj.length;item++)
    {
        var inputItem = outputobj.item(item);
        var inputLabel = inputItem.labels[0];
        var arr = {};
        arr.title = inputLabel.innerHTML;
        arr.id =  inputItem.id;
        arr.name =  inputItem.name;
        arr.value =  inputItem.value;
        output.push(arr);
    }
    for(var item=0;item<outputobjtextarea.length;item++)
    {
        var inputItem = outputobjtextarea.item(item); 
        var inputLabel = inputItem.labels[0];
        var arr = {};
        arr.title = inputLabel.innerHTML;
        arr.id =  inputItem.id;
        arr.name =  inputItem.name;
        arr.value =  inputItem.value;
        output.push(arr);
    }
    console.log('处理: ',output);
}
dynamicForm.prototype.cancel = function()
{
    this.parent.hide();
    console.log('取消: ');
}