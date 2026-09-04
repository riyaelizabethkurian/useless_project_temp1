import { toPng } from 'html-to-image';

export async function copyRoastText(roastData, bagType, contents, name, participantClass) {
  const suspectHeader = name ? `🚨 SUSPECT: ${name} ${participantClass ? `(${participantClass})` : ''} 🚨\n` : '';
  const dialogueSection = roastData.famousDialogue 
    ? `\n🎬 Iconic Movie Dialogue (${roastData.characterMovie || 'Malayalam Cinema'}):\n"${roastData.dialogueMalayalam || ''}"\n“${roastData.famousDialogue}”\n` 
    : '';

  const text = `👜 WHAT'S IN MY BAG? Official Police Dossier 👜
${suspectHeader}Diagnosed Personality: ${roastData.personalityName}
${dialogueSection}
Verdict: "${roastData.roastTitle}"
"${roastData.roastParagraph}"

🩸 Blood Pressure: ${roastData.scores?.bp || '165/110 mmHg'}
🔥 Stress Level: ${roastData.scores?.stressLevel || '99.4%'}
🧠 Stupidity Index: ${roastData.scores?.stupidity || '98.9%'}
⚠️ Critical Deficiency: ${roastData.scores?.lackOf || 'Lack of Common Sense'}
🌀 Chaos Level: ${roastData.scores?.chaosLevel || '95%'}
Get roasted at: ${window.location.origin}`;

  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  return false;
}

export async function downloadCardImage(cardElementId = 'roast-result-card') {
  const node = document.getElementById(cardElementId);
  if (!node) return false;

  try {
    const dataUrl = await toPng(node, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: '#FFF9EA',
      filter: (domNode) => {
        return !domNode.classList?.contains('no-export');
      }
    });

    const link = document.createElement('a');
    link.download = `whats-in-my-bag-dossier-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (err) {
    console.error('Failed to export card image:', err);
    return false;
  }
}

export async function shareResultNative(roastData, name) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `What's In My Bag - ${name ? `${name} is ` : ''}${roastData.personalityName}`,
        text: `I got diagnosed as "${roastData.personalityName}" (${roastData.famousDialogue}): ${roastData.roastTitle}`,
        url: window.location.href,
      });
      return true;
    } catch (err) {
      return false;
    }
  }
  return false;
}
