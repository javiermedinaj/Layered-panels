import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import '../style/base.css';

const HeroComponent = () => {
  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 769px)');
    const loader = document.querySelector('.loader');
    const button = {
      loader: document.querySelector('.loader_button'),
      openPanel: document.querySelector('.hero_media_button'),
      closePanel: document.querySelector('.panel_side_close'),
    };

    const hero = {
      media: document.querySelector('.hero_media'),
      mediaImage: document.querySelector('.hero_media_image'),
      backgroundImage: document.querySelector('.hero_background_image'),
    };

    const panel = {
      intro: document.querySelector('.panel_intro'),
      side: document.querySelector('.panel_side'),
      sideWrapper: document.querySelector('.panel_side_wrapper'),
      close: document.querySelector('.panel_side_close'),
    };

    const tlHero = gsap.timeline({ defaults: { duration: 2, ease: 'expo.inOut' } });
    const tlPanel = gsap.timeline({ paused: true, defaults: { duration: 1.4, ease: 'expo.inOut' } });

    const initHero = () => {
      gsap.set(hero.media, { scale: 1.5, autoAlpha: 0 });
      gsap.set(hero.backgroundImage, { scale: 1.2 });

      if (isDesktop.matches) {
        gsap.set(panel.intro, { xPercent: -100 });
      }
      gsap.set(panel.side, { pointerEvents: 'none', '--panel-overlay-opacity': 0 });
      gsap.set(panel.sideWrapper, { xPercent: 101 });
      gsap.set(panel.close, { autoAlpha: 0, pointerEvents: 'none' });
    };

    const animateHero = () => {
      tlHero
        .to(hero.backgroundImage, {
          duration: 2,
          scale: 1,
          ease: 'expo.inOut',
        })
        .to(
          hero.media,
          {
            scale: 1,
            autoAlpha: 1,
          },
          1.4
        );

      if (isDesktop.matches) {
        tlHero.to(
          panel.intro,
          {
            xPercent: 0,
          },
          0
        );
      }
    };

    const initPanel = () => {
      tlPanel
        .to(panel.side, {
          pointerEvents: 'auto',
          '--panel-overlay-opacity': 0.75,
        })
        .to(panel.sideWrapper, { xPercent: 0 }, 0)
        .to(panel.close, { autoAlpha: 0.75, pointerEvents: 'auto' }, 0.8);
    };

    const openPanel = () => {
      tlPanel.play();
    };

    const closePanel = () => {
      tlPanel.reverse();
    };

    const initLoader = () => {
      gsap.to(button.loader, {
        duration: 1.2,
        autoAlpha: 0,
        ease: 'expo.inOut',
        onComplete: () => {
          loader.remove();
          animateHero();
        },
      });
    };

    const addEventListeners = () => {
      button.loader?.addEventListener('click', initLoader);
      button.openPanel?.addEventListener('click', openPanel);
      button.closePanel?.addEventListener('click', closePanel);
    };

    initHero();
    initPanel();
    addEventListeners();
  }, []);

  return (
    <main className="app">
      <div className="loader">
        <div className="loader_wrapper">
          <button className="loader_button button">
            <span>&#11044;</span>
            <span>Let me in</span>
          </button>
        </div>
      </div>

      <div className="nav">
        <div className="nav_wrapper">
          <div className="nav_logo"><img src="./j-removebg-preview.png" alt="" style={{ width: '50px', height: '50px' }} /></div>
          <div className="nav_menu">
            <button className="button button-small">
              <span>&#11044;</span>
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      <section className="hero">
        <div className="hero_wrapper">
          <div className="hero_text">
            <h2 className="hero_text_title">Transform your Space.</h2>
            <h2 className="hero_text_title">Create Your Heaven.</h2>
          </div>

          <div className="hero_media">
            <div className="hero_media_wrapper">
              <figure className="hero_media_figure">
                <img className="hero_media_image" src="./hero.jpg" alt="" />
                <button className="hero_media_button button">
                  <span>&#11044;</span>
                  <span>Discover More</span>
                </button>
              </figure>

              <div className="hero_media_text">
                <span className="hero_media_text_caption">Harmony</span>
                <h3 className="hero_media_text_title">Space Symphony</h3>
                <p className="hero_media_text_paragraph">
                  For a playful tone:
                  <br />
                  The Design Den, The Style Burrow
                </p>
              </div>
            </div>
          </div>

          {/* <div className="hero_extra">
            <span>Scroll</span>
          </div> */}

          <div className="hero_background">
            <img className="hero_background_image" src="/hero.jpg" alt="" />
          </div>

          <div className="hero_panel panel_intro"></div>

          <div className="hero_panel panel_side">
            <div className="panel_side_close">
              <span>&#10006;</span>
            </div>

            <div className="panel_side_wrapper">
              <div className="panel_side_col">
                <h2 className="panel_side_col_title">
                  We craft beautiful, functional interiors that reflect your unique style and personality.
                </h2>
                <p>
                  We are a team of passionate interior designers dedicated to crafting spaces that inspire, invigorate, and reflect the individuality of our clients.
                </p>
              </div>
              <div className="panel_side_col">
                <img className="panel_side_col_image" src="/hero-side.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroComponent;
