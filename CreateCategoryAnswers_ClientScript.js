function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
    return;
    }
    var ga = new GlideAjax('CreateCategoryAnswers');
    ga.addParam('sysparm_name','createAnswers');
    ga.addParam('sysparm_id',g_form.getUniqueValue());
	ga.addParam('sysparm_category',g_form.getValue('category'));
	ga.addParam('sysparm_subcategory',g_form.getValue('subcategory'));
	ga.addParam('sysparm_category3',g_form.getValue('u_category3'));
    ga.getXML(handleResponse);
    function handleResponse(response) {
		var result = response.responseXML.getElementsByTagName('result')[0].getAttribute('message');
		if (result != "empty") {
		    showQuestions();		
		}
    }
	
	function showQuestions() {
		var gdw = new GlideModal('show_questions');
		gdw.setTitle("Preguntas adicionales");
		gdw.setPreference('sysparm_id',g_form.getUniqueValue().toString());
		gdw.render();
	}
  
   //Type appropriate comment here, and begin script below
   
}