
const handleSubmit = async (e) => {
  e.preventDefault();

  const email = "sa@gmail.com";
  const password = "1";

  const result = await authService.login(email, password);
  console.log(result);
};
