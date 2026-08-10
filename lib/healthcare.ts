import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Analyze clinical text
export async function analyzeClinicalText(text: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: 'Analyze clinical text for medical conditions, medications, and recommendations.' },
        { role: 'user', content: text },
      ],
    });
    return response.choices[0].message.content;
  } catch (error: any) {
    throw new Error(`Clinical analysis error: ${error?.message || 'Unknown error'}`);
  }
}

// Generate patient summary
export async function generatePatientSummary(patientData: any) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: 'Generate a comprehensive patient summary from medical data.' },
        { role: 'user', content: JSON.stringify(patientData) },
      ],
    });
    return response.choices[0].message.content;
  } catch (error: any) {
    throw new Error(`Summary generation error: ${error?.message || 'Unknown error'}`);
  }
}

// Check drug interactions
export async function checkDrugInteractions(medications: string[]) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: 'Check for potential drug interactions and provide safety information.' },
        { role: 'user', content: `Medications: ${medications.join(', ')}` },
      ],
    });
    return response.choices[0].message.content;
  } catch (error: any) {
    throw new Error(`Drug interaction check error: ${error?.message || 'Unknown error'}`);
  }
}

// Generate treatment recommendations
export async function generateTreatmentRecommendations(diagnosis: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: 'Generate evidence-based treatment recommendations for the given diagnosis.' },
        { role: 'user', content: diagnosis },
      ],
    });
    return response.choices[0].message.content;
  } catch (error: any) {
    throw new Error(`Treatment recommendation error: ${error?.message || 'Unknown error'}`);
  }
}

// Extract medical entities
export async function extractMedicalEntities(text: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: 'Extract medical entities: conditions, medications, procedures, and lab results.' },
        { role: 'user', content: text },
      ],
    });
    return response.choices[0].message.content;
  } catch (error: any) {
    throw new Error(`Entity extraction error: ${error?.message || 'Unknown error'}`);
  }
}

// Audit logging
export async function auditLog(action: string, userId: string, data: any) {
  try {
    // Log to database or external service
    console.log(`Audit: ${action} by ${userId}`, data);
    return { success: true, timestamp: new Date().toISOString() };
  } catch (error: any) {
    throw new Error(`Audit log error: ${error?.message || 'Unknown error'}`);
  }
}
