export const getMyBooks = async (username) => {
  console.log(username);
  try {
    const res = await fetch(`/api/book/my/${username}`);
    const result = await res.json();
    console.log(result);
    return result;
  } catch (e) {
    return null;
  }
};
