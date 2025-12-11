import { GoogleGenAI } from "@google/genai";
import { Order } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = 'gemini-2.5-flash';

export const generateConsultationSummary = async (order: Order, tone: 'formal' | 'gentle'): Promise<string> => {
  const itemsList = order.items.map(item => `- ${item.name} (${item.quantity}개): ${(item.price * item.quantity).toLocaleString()}원`).join('\n');
  const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const prompt = `
    당신은 전문적이고 배려심 깊은 장례지도사입니다.
    다음 고객의 견적 내용을 바탕으로 고객에게 보낼 ${tone === 'formal' ? '격식있는' : '부드럽고 위로가 담긴'} 요약 메시지를 작성해주세요.
    메시지는 문자 메시지로 보내기 적절한 길이여야 합니다.
    
    [고객 정보]
    상주: ${order.clientName}
    고인: ${order.deceasedName}
    
    [선택 품목]
    ${itemsList}
    
    총 예상 비용: ${total.toLocaleString()}원
    
    추가로, 장례 절차에 대해 안심할 수 있는 한 문장을 덧붙여주세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "요약을 생성하는 중 문제가 발생했습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "죄송합니다. AI 서비스 연결에 실패했습니다.";
  }
};

export const explainTerm = async (term: string): Promise<string> => {
  const prompt = `
    장례 용어 "${term}"에 대해 일반인이 이해하기 쉽게 설명해주세요.
    너무 길지 않게, 2~3문장으로 핵심만 정중하게 설명해주세요.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "설명을 불러올 수 없습니다.";
  } catch (error) {
     console.error("Gemini API Error:", error);
    return "죄송합니다. 정보를 불러오는 중 오류가 발생했습니다.";
  }
};