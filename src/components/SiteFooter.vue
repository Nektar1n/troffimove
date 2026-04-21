<script setup>
import SocialLinks from './SocialLinks.vue';
</script>

<template>
  <footer class="foot">
    <div class="foot__inner">
      <div class="foot__brand">
        <span class="foot__mark">T</span>
        <div>
          <div class="foot__name">Troffimove Auto</div>
          <div class="foot__sub">Импорт автомобилей из Кореи, Европы и Японии. Договор, смета, сроки — в письменном виде.</div>
        </div>
      </div>
      <div class="foot__cols">
        <div>
          <div class="foot__h">Контакты</div>
          <p>hello@troffimove.auto</p>
          <p>+7 (000) 000-00-00</p>
          <SocialLinks variant="footer" />
        </div>
        <div>
          <div class="foot__h">Разделы</div>
          <a href="#regions">Направления</a>
          <a href="#brands">Марки</a>
          <a href="#cases">Кейсы</a>
          <a href="#reviews">Отзывы</a>
          <a href="#contact">Заявка</a>
        </div>
      </div>
    </div>
    <div class="foot__bar">© {{ new Date().getFullYear() }} Troffimove Auto</div>
  </footer>
</template>

<style scoped>
.foot {
  border-top: 1px solid var(--line-light);
  background: var(--bg-subtle);
  padding: 2rem max(1rem, env(safe-area-inset-left, 0px)) calc(1.5rem + env(safe-area-inset-bottom, 0px))
    max(1rem, env(safe-area-inset-right, 0px));
}

@media (min-width: 720px) {
  .foot {
    padding: 2.5rem max(1.25rem, env(safe-area-inset-left, 0px)) 1.5rem max(1.25rem, env(safe-area-inset-right, 0px));
  }
}

.foot__inner {
  max-width: 1120px;
  margin: 0 auto 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 720px) {
  .foot__inner {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.foot__brand {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  max-width: 22rem;
}

.foot__mark {
  width: 2rem;
  height: 2rem;
  border-radius: 2px;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 0.9rem;
  background: var(--text);
  color: #fff;
  flex-shrink: 0;
}

.foot__name {
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: -0.02em;
}

.foot__sub {
  font-size: 0.8125rem;
  line-height: 1.45;
  color: var(--muted);
  margin-top: 0.35rem;
}

.foot__cols {
  display: flex;
  gap: 3rem;
}

.foot__h {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.5rem;
}

.foot__cols p,
.foot__cols a {
  margin: 0.2rem 0;
  font-size: 0.875rem;
  color: var(--text);
}

.foot__cols a {
  display: block;
  color: var(--accent);
  text-decoration: none;
}

.foot__cols a:hover {
  text-decoration: underline;
}

.foot__bar {
  max-width: 1120px;
  margin: 0 auto;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line-light);
  font-size: 0.75rem;
  color: var(--muted);
}
</style>
