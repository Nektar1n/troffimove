<script setup>
import { RouterLink } from 'vue-router';
import SocialLinks from './SocialLinks.vue';
</script>

<template>
  <footer class="foot">
    <div class="foot__inner">
      <div class="foot__brand">
        <span class="foot__mark">T</span>
        <div>
          <div class="foot__name">Troffimove Auto</div>
          <div class="foot__sub">
            Пригон из Кореи, Европы и Японии — и выездная проверка б/у на месте. Договор, смета, отчёт по осмотру.
          </div>
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
          <RouterLink to="/">Главная</RouterLink>
          <RouterLink to="/privoz">Привоз</RouterLink>
          <RouterLink to="/podbor">Подбор</RouterLink>
          <RouterLink :to="{ path: '/', hash: '#cases' }">Кейсы и отзывы</RouterLink>
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
  background: var(--surface-dark);
  color: rgba(255, 255, 255, 0.88);
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
  max-width: 24rem;
}

.foot__mark {
  width: 2rem;
  height: 2rem;
  border-radius: 2px;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 0.9rem;
  background: var(--yellow);
  color: var(--yellow-ink);
  flex-shrink: 0;
}

.foot__name {
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: -0.02em;
  color: #fff;
}

.foot__sub {
  font-size: 0.8125rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.55);
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
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 0.5rem;
}

.foot__cols p,
.foot__cols a {
  margin: 0.2rem 0;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.88);
}

.foot__cols a {
  display: block;
  color: var(--yellow);
  text-decoration: none;
}

.foot__cols a:hover {
  text-decoration: underline;
  color: var(--yellow-hover);
}

.foot__bar {
  max-width: 1120px;
  margin: 0 auto;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
}

.foot :deep(.soc--footer .soc__link) {
  border-color: rgba(255, 255, 255, 0.22);
  color: var(--yellow);
  background: rgba(0, 0, 0, 0.35);
}

.foot :deep(.soc--footer .soc__link:hover) {
  border-color: rgba(245, 196, 18, 0.55);
  background: rgba(255, 255, 255, 0.06);
}
</style>
