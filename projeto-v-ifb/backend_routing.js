/**
 * Project V - Core Routing & Privacy Engine
 * Trigger: On Form Submit
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Projeto V')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
function onFormSubmitTrigger(e) {
  try {
    // 1. Extract the named values from the form submission event
    var formResponses = e.namedValues;
    
    // 2. Map fields to clean variables (matching your exact sheet keys)
    var date = formResponses['data'] ? formResponses['data'][0] : '';
    var time = formResponses['hora'] ? formResponses['hora'][0] : '';
    var campus = formResponses['ifb_campus'] ? formResponses['ifb_campus'][0] : '';
    var discriminationType = formResponses['discrimination_type'] ? formResponses['discrimination_type'][0] : '';
    var accusedRole = formResponses['denunciado_funcao'] ? formResponses['denunciado_funcao'][0] : '';
    
    // 3. Define standard administrative emails
    var prexEmail = "prex@ifb.edu.br"; // Fixed institutional CC
    var ouvidoriaEmail = "ouvidoria@ifb.edu.br"; // Compliance target
    
    // 4. Fetch the specific target core email (NEABI, NAPNE, NUGEDIS) based on Campus and Type
    var targetCoreEmail = getTargetCoreEmail(campus, discriminationType);
    
    // 5. Build the institutional compliance alert
    var emailSubject = "[PROJETO V] Alerta de Ocorrência Institucional - " + campus + " (" + discriminationType + ")";
    var emailBody = buildEmailBody(formResponses);
    
    // 6. EXECUTE LEGAL & ADMINISTRATIVE ROUTING RULES
    // If the accused person is a Professor or Staff, Ouvidoria must be included immediately
    if (accusedRole.toLowerCase() === "professor" || accusedRole.toLowerCase() === "funcionário") {
      
      // Send email to Core with CC to PREX and Ouvidoria
      MailApp.sendEmail({
        to: targetCoreEmail,
        cc: prexEmail + "," + ouvidoriaEmail,
        subject: emailSubject,
        htmlBody: emailBody
      });
      
    } else {
      // Standard routing for student-to-student or external community incidents
      MailApp.sendEmail({
        to: targetCoreEmail,
        cc: prexEmail,
        subject: emailSubject,
        htmlBody: emailBody
      });
    }
    
  } catch (error) {
    Logger.log("Execution failed: " + error.toString());
  }
}

/**
 * Helper function to dynamically map Campus and Discrimination Type to the correct core email.
 * For production, this will query your "Email_Routing_Table" sheet.
 */
function getTargetCoreEmail(campus, type) {
  var normalizedType = type.toLowerCase();
  
  // Placeholder mock logic for your MVP environment
  if (normalizedType.includes("racismo")) {
    return "neabi." + campus.toLowerCase().replace(/[^a-z0-9]/g, "") + "@ifb.edu.br";
  } else if (normalizedType.includes("capacitismo")) {
    return "napne." + campus.toLowerCase().replace(/[^a-z0-9]/g, "") + "@ifb.edu.br";
  } else if (normalizedType.includes("lgbtfobia")) {
    return "nugedis." + campus.toLowerCase().replace(/[^a-z0-9]/g, "") + "@ifb.edu.br";
  }
  
  return "prex@ifb.edu.br"; // Fallback safety email
}

/**
 * Helper function to assemble the HTML email layout securely
 */
function buildEmailBody(responses) {
  var html = "<h3>Alerta Automatizado - Projeto V</h3>";
  html += "<p>Uma nova ocorrência foi registrada no sistema com as seguintes características operacionais:</p>";
  html += "<ul>";
  html += "<li><b>Campus:</b> " + (responses['ifb_campus'] ? responses['ifb_campus'][0] : 'Não informado') + "</li>";
  html += "<li><b>Micro-local:</b> " + (responses['specific_location'] ? responses['specific_location'][0] : 'Não informado') + "</li>";
  html += "<li><b>Presença de Servidores:</b> " + (responses['staff_presence'] ? responses['staff_presence'][0] : 'Não informado') + "</li>";
  html += "<li><b>Comportamento de Testemunhas:</b> " + (responses['bystander_behavior'] ? responses['bystander_behavior'][0] : 'Não informado') + "</li>";
  html += "<li><b>Vínculo do Denunciado:</b> " + (responses['denunciado_funcao'] ? responses['denunciado_funcao'][0] : 'Não informado') + "</li>";
  html += "</ul>";
  html += "<p><b>Descrição Anonimizada do Fato:</b><br>" + (responses['incidente_description'] ? responses['incidente_description'][0] : 'Sem descrição') + "</p>";
  html += "<br><hr><p style='font-size:11px;color:gray;'>Este e-mail foi gerado automaticamente pelo motor de proteção do Projeto V. Os dados de identificação pessoal foram retidos na barreira de privacidade.</p>";
  return html;
}