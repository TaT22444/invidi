// テスト用関数 - Netlify Functionsが正しく動作するか確認
exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Netlify Functions テスト成功" })
  };
}; 