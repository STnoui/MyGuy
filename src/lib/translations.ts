export const translations = {
  en: {
    language: "EN",
    heroTitle: "MyGuy",
    operatingHours: "Operating Hours: 20:00 - 06:00",
    servicesTitle: "What We Do",
    orderButton: "ORDER NOW",
    nav: {
      home: "Home",
      contact: "Contact Us",
      about: "About Us",
    },
    settings: {
      title: "Settings",
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      system: "System",
    },
    contact: {
      title: "Get in Touch",
      description: "Follow us on social media or send us an email.",
      followFacebook: "Follow us on Facebook",
      supportEmail: "Contact us via Email",
      callUs: "Call us directly",
    },
    about: {
      title: "About MyGuy",
      p1: "MyGuy is your reliable partner for all night-time needs in Sofia. We started with a simple idea: to provide a fast, friendly, and dependable delivery service when most of the city is asleep.",
      p2: "Whether you need a late-night snack, medicine from the pharmacy, or a special delivery to surprise a loved one, we are here for you from 20:00 to 06:00 every night.",
    },
    services: {
      deliveries: {
        title: "Deliveries",
        description: "From non-stop shops, pharmacies, and fast-food places.",
      },
      easypay: {
        title: "EasyPay Top-ups",
        description: "Top up your account via EasyPay with your National ID Number (EGN).",
      },
      parcels: {
        title: "Parcel Services",
        description: "We can send and receive packages for you.",
      },
      flowers: {
        title: "Flower Delivery",
        description: "Surprise someone with a late-night flower delivery.",
      },
    },
    aria: {
      toggleNav: "Toggle navigation menu",
      toggleSettings: "Toggle settings menu",
    },
  },
  bg: {
    language: "БГ",
    heroTitle: "MyGuy",
    operatingHours: "Работно време: 20:00 - 06:00",
    servicesTitle: "Какво предлагаме",
    orderButton: "ПОРЪЧАЙ СЕГА",
    nav: {
      home: "Начало",
      contact: "Контакти",
      about: "За нас",
    },
    settings: {
      title: "Настройки",
      language: "Език",
      theme: "Тема",
      light: "Светла",
      dark: "Тъмна",
      system: "Системна",
    },
    contact: {
      title: "Свържете се с нас",
      description: "Последвайте ни в социалните мрежи или ни изпратете имейл.",
      followFacebook: "Последвайте ни във Facebook",
      supportEmail: "Свържете се с нас по имейл",
      callUs: "Обадете ни се директно",
    },
    about: {
      title: "За MyGuy",
      p1: "MyGuy е вашият надежден партньор за всички нощни нужди в София. Започнахме с проста идея: да предоставим бърза, приятелска и надеждна услуга за доставка, когато по-голямата част от града спи.",
      p2: "Независимо дали имате нужда от късна закуска, лекарства от аптеката или специална доставка, за да изненадате любим човек, ние сме тук за вас от 20:00 до 06:00 всяка вечер.",
    },
    services: {
      deliveries: {
        title: "Доставки",
        description: "От денонощни магазини, аптеки и заведения за бързо хранене.",
      },
      easypay: {
        title: "Зареждане на EasyPay",
        description: "Зареждане на акаунти в EASYPAY с ЕГН.",
      },
      parcels: {
        title: "Пратки",
        description: "Изпращане и получаване на пратки.",
      },
      flowers: {
        title: "Доставка на цветя",
        description: "Изненадайте някого с късна доставка на цветя.",
      },
    },
    aria: {
      toggleNav: "Превключване на навигационното меню",
      toggleSettings: "Превключване на менюто с настройки",
    },
  },
};

export type Language = keyof typeof translations;