export const translations = {
  en: {
    language: "EN",
    heroTitle: "Your Guy for Sofia's Night",
    operatingHours: "Operating Hours: 20:00 - 06:00",
    servicesTitle: "What We Do",
    orderButton: "ORDER NOW",
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
    followFacebook: "Follow us on Facebook",
    supportEmail: "Contact us via Email",
  },
  bg: {
    language: "БГ",
    heroTitle: "Твоят нощен доставчик в София",
    operatingHours: "Работно време: 20:00 - 06:00",
    servicesTitle: "Какво предлагаме",
    orderButton: "ПОРЪЧАЙ СЕГА",
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
    followFacebook: "Последвайте ни във Facebook",
    supportEmail: "Свържете се с нас по имейл",
  },
};

export type Language = keyof typeof translations;