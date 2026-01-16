// ✅ MOCK PDF PARSER - Works 100% instantly, no dependencies
export const pdfParser = async (pdfBuffer) => {
  console.log('📄 PDF received, size:', pdfBuffer?.length || 0, 'bytes');
  
  // Mock realistic SOP chunks (for testing)
  const mockChunks = [
    "Company SOP: Employee onboarding process requires HR approval and IT setup within 3 days.",
    "IT Policy: Password must be 12+ characters with special symbols. Change every 90 days.",
    "Leave Policy: Submit request 7 days prior via HR portal. Maximum 20 days annual leave.",
    "Expense Policy: Receipts required for all claims above ₹500. Approval within 48 hours.",
    "Remote Work: Approved laptops only. VPN mandatory. Daily status update in Slack."
  ];
  
  console.log(`✅ Generated ${mockChunks.length} SOP chunks for RAG`);
  return mockChunks;
};
