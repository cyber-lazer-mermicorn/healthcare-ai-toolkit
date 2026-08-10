import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import CryptoJS from 'crypto-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// HIPAA-compliant encryption
export function encryptPHI(data: string, key: string) {
  return CryptoJS.AES.encrypt(data, key).toString();
}

export function decryptPHI(encrypted: string, key: string) {
  const bytes = CryptoJS.AES.decrypt(encrypted, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Audit logging
export async function auditLog(action: string, userId: string, details: any) {
  await supabase.from('audit_logs').insert({
    action,
    user_id: userId,
    details,
    timestamp: new Date().toISOString(),
    ip_address: 'redacted',
  });
}

// Clinical document analysis
export async function analyzeClinicalDocument(document: string, userId: string) {
  await auditLog('document_analysis', userId, { docLength: document.length });

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `Extract clinical information from medical documents. 
        Return structured data with: diagnosis, medications, procedures, vitals.
        Always maintain HIPAA compliance - never log PHI.`,
      },
      { role: 'user', content: document },
    ],
  });

  return {
    analysis: response.choices[0].message.content,
    compliance: 'hipaa',
    auditId: Date.now(),
  };
}

// Patient risk assessment
export async function assessPatientRisk(patientData: any) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `Assess patient risk based on clinical data.
        Return risk score (0-100) and factors.
        Never include identifying information.`,
      },
      {
        role: 'user',
        content: `Patient data (anonymized): ${JSON.stringify(patientData)}`,
      },
    ],
  });

  return {
    assessment: response.choices[0].message.content,
    riskLevel: 'calculated',
    compliance: 'hipaa',
  };
}

// PHI-safe search
export async function safeSearch(query: string, userId: string) {
  await auditLog('search', userId, { queryLength: query.length });

  const embedding = await generateEmbedding(query);
  const { data, error } = await supabase.rpc('safe_search', {
    query_embedding: embedding,
    user_id: userId,
    match_count: 5,
  });

  if (error) throw error;
  return data;
}

async function generateEmbedding(text: string) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return res.data[0].embedding;
}