$j('.save').on('click',saveData);
function saveData(event) {
	event.preventDefault();    
	var incId = g_form.getUniqueValue();
	var questions = $j("[name*='q-']");
	var qMandatory = getMandatory(questions);
    var filled = checkMandatory(qMandatory);
	if (filled) {
		for (var i=0; i< questions.length; i++) {
			saveAnswer(questions[i],incId);
		}
		$j('.sc_variable_editor').remove();
		GlideDialogWindow.get().destroy();
		g_form.addInfoMessage("Cuestionario guardado correctamente");
	}else {
		flashMandatoryQuestions(qMandatory);
		alert("No están rellenas todas las preguntas");
	}	
}
function getMandatory(questions) {
	var qMandatory = [];
	for (var i=0; i<questions.length; i++) {
		if (questions[i].getAttribute('mandatory')=="true") {
			qMandatory.push(questions[i]);
		}
	}
	return qMandatory;
}
function checkMandatory(questions) {
	var filled=true;
	for (var i = 0; i<questions.length; i++) {
		if (questions[i].value == "") {
			filled = false;
			return;
		}
	}
	return filled;
}
function flashMandatoryQuestions(questions) {
	for (var i = 0; i<questions.length;i++) {
		questions[i].style.backgroundColor='#fef0f0';
	}
}
function saveAnswer(question,incId) {

	var ga = new GlideAjax('SaveAnswersValues');
	ga.addParam('sysparm_name','save');
	ga.addParam('sysparm_id',incId);
	ga.addParam('sysparm_question',question.getAttribute('name').substr(2));
	ga.addParam('sysparm_value',question.value);
	ga.getXML(handleResponse);
}
function handleResponse(response)  {

}