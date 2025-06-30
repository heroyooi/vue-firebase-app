<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink to="/">홈</RouterLink> |
        <RouterLink to="/login">로그인</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

header {
  background: #333;
  color: white;
  padding: 10px 20px;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 12px;
}

main {
  padding: 20px;
}
</style>
