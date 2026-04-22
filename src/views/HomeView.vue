<script setup>
import { RouterLink } from 'vue-router';
import HeroBlock from '../components/HeroBlock.vue';
import CasesSection from '../components/CasesSection.vue';
import ReviewsSection from '../components/ReviewsSection.vue';
import ContactForm from '../components/ContactForm.vue';
</script>

<template>
  <main>
    <HeroBlock />

    <section class="home-split" aria-label="Направления работы">
      <div class="home-split__inner">
        <RouterLink class="home-split__card" to="/privoz">
          <span class="home-split__label">Привоз</span>
          <span class="home-split__text">Аукционы, логистика, таможня и учёт в РФ — весь цикл под ключ.</span>
          <span class="home-split__go">Перейти в раздел <span class="home-split__go-ico" aria-hidden="true">→</span></span>
        </RouterLink>
        <RouterLink class="home-split__card" to="/podbor">
          <span class="home-split__label">Подбор</span>
          <span class="home-split__text">Выездная проверка и сопровождение покупки б/у на местном рынке.</span>
          <span class="home-split__go">Перейти в раздел <span class="home-split__go-ico" aria-hidden="true">→</span></span>
        </RouterLink>
      </div>
    </section>

    <CasesSection />
    <ReviewsSection />
    <ContactForm />
  </main>
</template>

<style scoped>
.home-split {
  padding: 1.5rem max(1rem, env(safe-area-inset-left, 0px)) 2.1rem max(1rem, env(safe-area-inset-right, 0px));
  border-bottom: 1px solid var(--line-light);
  background: var(--bg);
}

@media (min-width: 720px) {
  .home-split {
    padding-top: 1.65rem;
    padding-bottom: 2.35rem;
  }
}

.home-split__inner {
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
}

@media (min-width: 720px) {
  .home-split__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.1rem;
  }
}

.home-split__card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 1.2rem 1.25rem 1.3rem 1.35rem;
  border-radius: 10px;
  border: 1px solid var(--line);
  border-left: 3px solid var(--yellow);
  background: #fff;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, background 0.2s ease;
  box-shadow: none;
}

.home-split__card:hover {
  border-color: rgba(15, 15, 16, 0.22);
  background: #fafaf9;
}

.home-split__card:focus-visible {
  outline: 2px solid var(--yellow);
  outline-offset: 2px;
}

.home-split__label {
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: var(--text);
}

.home-split__text {
  font-size: 0.925rem;
  line-height: 1.5;
  color: var(--muted);
  flex: 1 1 auto;
}

.home-split__go {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  margin-top: 0.4rem;
  min-height: 40px;
  padding: 0.45rem 0.95rem 0.45rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--yellow-ink);
  background: var(--yellow);
  border: 1px solid #d4a012;
  border-radius: 999px;
  width: max-content;
  max-width: 100%;
  transition: filter 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.home-split__go-ico {
  position: relative;
  top: 0.5px;
  line-height: 0;
  font-size: 1.05em;
  opacity: 0.9;
}

.home-split__card:hover .home-split__go {
  background: var(--yellow-hover);
  border-color: #b8930e;
  filter: none;
}
</style>
