
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
    titleButton.onmouseout = this.unDragTitle;
 }
dynamicForm.prototype.process = function()
{
    console.log('处理: ');
}
dynamicForm.prototype.cancel = function()
{
    this.parent.hide();
    console.log('取消: ');
}
dynamicForm.prototype.DragTitle = function(event)
{
    this.style.cursor="move";
    this.parent.fadeTool.clickOnDiv(this.parent.div,event);
    console.log('点击: ');
}
dynamicForm.prototype.focusTitle = function(event)
{
    this.style.cursor="move";
    console.log('进入: ');
}
dynamicForm.prototype.unDragTitle = function()
{
    this.parent.fadeTool.onUpDiv();
    this.style.cursor="default";
    console.log('释放: ');
}