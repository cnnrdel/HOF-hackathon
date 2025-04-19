// Define all translations for the application

export const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "ht", name: "Kreyòl Ayisyen", flag: "🇭🇹" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ur", name: "اردو", flag: "🇵🇰" },
  { code: "yi", name: "ייִדיש", flag: "🇮🇱" },
]

// Create a base translations object with all the keys we need to translate
const baseTranslations = {
  // Home page
  "hero.title": "",
  "hero.subtitle": "",
  "hero.getStarted": "",
  "hero.login": "",
  "features.title": "",
  "features.profile.title": "",
  "features.profile.description": "",
  "features.content.title": "",
  "features.content.description": "",
  "features.assistant.title": "",
  "features.assistant.description": "",
  "cta.title": "",
  "cta.subtitle": "",
  "cta.button": "",

  // Resource categories
  "preferences.housing": "",
  "preferences.housing.description": "",
  "preferences.healthcare": "",
  "preferences.healthcare.description": "",

  // Emergency section
  "emergency.housing": "",
  "emergency.housing.description": "",
  "emergency.healthcare": "",
  "emergency.healthcare.description": "",
  "emergency.family": "",
  "emergency.family.description": "",

  // Footer
  "footer.description": "",
  "footer.quickLinks": "",
  "footer.home": "",
  "footer.resources": "",
  "footer.account": "",
  "footer.emergency": "",
  "footer.housingCrisis": "",
  "footer.healthCrisis": "",
  "footer.about": "",
  "footer.aboutText": "",
  "footer.emergency911": "",
  "footer.copyright": "",

  // Auth pages
  "signup.title": "",
  "signup.description": "",
  "signup.name": "",
  "signup.email": "",
  "signup.password": "",
  "signup.button": "",
  "signup.loading": "",
  "signup.login": "",
  "signup.loginLink": "",
  "signup.verificationSent": "",
  "signup.afterVerification": "",

  "login.title": "",
  "login.description": "",
  "login.email": "",
  "login.password": "",
  "login.button": "",
  "login.loading": "",
  "login.signup": "",
  "login.signupLink": "",
  "login.forgotPassword": "",

  // Preferences page
  "preferences.title": "",
  "preferences.description": "",
  "preferences.topics": "",
  "preferences.experience": "",
  "preferences.beginner": "",
  "preferences.intermediate": "",
  "preferences.advanced": "",
  "preferences.immediate": "",
  "preferences.planning": "",
  "preferences.supporting": "",
  "preferences.saving": "",
  "preferences.continue": "",

  // Dashboard
  "dashboard.welcome": "",
  "dashboard.interests": "",
  "dashboard.askAI": "",
  "dashboard.profile": "",
  "dashboard.articles": "",
  "dashboard.tutorials": "",
  "dashboard.courses": "",
  "dashboard.read": "",
  "dashboard.loading": "",
  "dashboard.generalWelcome": "",
  "dashboard.generalDescription": "",
  "dashboard.searchPlaceholder": "",
  "dashboard.all": "",
  "dashboard.emergency": "",
  "dashboard.housing": "",
  "dashboard.healthcare": "",
  "dashboard.food": "",
  "dashboard.emergencyResources": "",
  "dashboard.housingResources": "",
  "dashboard.healthcareResources": "",
  "dashboard.foodResources": "",
  "dashboard.highPriority": "",
  "dashboard.viewDetails": "",
  "dashboard.previewMode": "",
  "dashboard.previewDescription": "",

  // Chatbot
  "chatbot.title": "",
  "chatbot.placeholder": "",
  "chatbot.welcome": "",
  "chatbot.description": "",

  // Language
  "language.select": "",
  "language.preference": "",
  "language.save": "",

  // Verification
  "verify.loading": "",
  "verify.loadingDesc": "",
  "verify.success": "",
  "verify.successDesc": "",
  "verify.error": "",
  "verify.errorDesc": "",
  "verify.pleaseWait": "",
  "verify.accountReady": "",
  "verify.login": "",
  "verify.browse": "",
  "verify.tryAgain": "",
  "verify.home": "",
  "verify.didntReceive": "",
  "verify.resendEmail": "",
  "verify.resending": "",
  "verify.emailResent": "",
  "verify.resendWait": "",
  "verify.resendTitle": "",
  "verify.resendDesc": "",
  "verify.resendLink": "",
  "verify.needVerification": "",

  // Common
  "common.cancel": "",
  "common.loading": "",

  // Profile
  "profile.signOutConfirmTitle": "",
  "profile.signOutConfirmDesc": "",
  "profile.signOutConfirm": "",
  "profile.deleteAccountTitle": "",
  "profile.deleteAccountDesc": "",
  "profile.deleteAccountConfirm": "",

  // Onboarding
  "onboarding.back": "",
  "onboarding.next": "",
  "onboarding.complete": "",
  "onboarding.completing": "",
  "onboarding.confirmation": "",
  "onboarding.confirmationTitle": "",
  "onboarding.confirmationDescription": "",
  "onboarding.reviewPrompt": "",
  "onboarding.category.personal": "",
  "onboarding.category.housing": "",
  "onboarding.category.healthcare": "",
  "onboarding.category.financial": "",
  "onboarding.category.education": "",
  "onboarding.category.employment": "",
  "onboarding.title.personal": "",
  "onboarding.title.housing": "",
  "onboarding.title.healthcare": "",
  "onboarding.title.financial": "",
  "onboarding.title.education": "",
  "onboarding.title.employment": "",
  "onboarding.description.personal": "",
  "onboarding.description.housing": "",
  "onboarding.description.healthcare": "",
  "onboarding.description.financial": "",
  "onboarding.description.education": "",
  "onboarding.description.employment": "",

  // Location
  "location.current": "",
  "location.select": "",
  "location.nyc": "",
  "location.boston": "",
  "location.chicago": "",
  "location.la": "",
  "location.miami": "",
  "location.filter": "",
}

export const translations = {
  en: {
    // Home page
    "hero.title": "Find Housing & Healthcare Resources",
    "hero.subtitle": "Access critical information and support services tailored to your specific needs.",
    "hero.getStarted": "Get Started",
    "hero.login": "Login",
    "features.title": "Essential Resources",
    "features.profile.title": "Create Your Profile",
    "features.profile.description": "Sign up and tell us about your needs to get personalized assistance.",
    "features.content.title": "Browse Resources",
    "features.content.description": "Find housing, healthcare, and support services in your area.",
    "features.assistant.title": "Get Immediate Help",
    "features.assistant.description": "Connect with emergency services and crisis support when you need it most.",
    "cta.title": "Need Help Right Now?",
    "cta.subtitle": "If you're in an emergency situation, these resources can provide immediate assistance.",
    "cta.button": "Create Your Account",

    // Resource categories
    "preferences.housing": "Housing Assistance",
    "preferences.housing.description":
      "Find emergency shelters, affordable housing options, rental assistance programs, and housing rights information.",
    "preferences.healthcare": "Healthcare Services",
    "preferences.healthcare.description":
      "Access information about free clinics, insurance assistance, mental health services, and family healthcare.",

    // Emergency section
    "emergency.housing": "Emergency Housing",
    "emergency.housing.description": "24/7 emergency shelter hotline",
    "emergency.healthcare": "Healthcare Crisis",
    "emergency.healthcare.description": "Medical emergency assistance",
    "emergency.family": "Family Services",
    "emergency.family.description": "Support for families in crisis",

    // Footer
    "footer.description": "Connecting people with essential housing and healthcare resources.",
    "footer.quickLinks": "Quick Links",
    "footer.home": "Home",
    "footer.resources": "Resources",
    "footer.account": "My Account",
    "footer.emergency": "Emergency",
    "footer.housingCrisis": "Housing Crisis",
    "footer.healthCrisis": "Health Crisis",
    "footer.about": "About",
    "footer.aboutText":
      "CareCompass is dedicated to helping vulnerable populations access critical housing and healthcare resources.",
    "footer.emergency911": "If you're experiencing an immediate emergency, please call 911.",
    "footer.copyright": "All rights reserved.",

    // Auth pages
    "signup.title": "Create an account",
    "signup.description": "Enter your information to create an account",
    "signup.name": "Full Name",
    "signup.email": "Email",
    "signup.password": "Password",
    "signup.button": "Sign Up",
    "signup.loading": "Creating account...",
    "signup.login": "Already have an account?",
    "signup.loginLink": "Log in",
    "signup.verificationSent":
      "We've sent a verification link to your email address. Please check your inbox (and spam folder) and click the link to verify your account.",
    "signup.afterVerification":
      "After verifying your email, you'll be able to log in and access all features of CareCompass.",

    "login.title": "Log in to your account",
    "login.description": "Enter your credentials to access your account",
    "login.email": "Email",
    "login.password": "Password",
    "login.button": "Log In",
    "login.loading": "Logging in...",
    "login.signup": "Don't have an account?",
    "login.signupLink": "Sign up",
    "login.forgotPassword": "Forgot password?",

    // Preferences page
    "preferences.title": "Your Resource Preferences",
    "preferences.description": "Select the types of resources you're interested in to personalize your dashboard.",
    "preferences.topics": "Resource Categories",
    "preferences.experience": "What is your current situation?",
    "preferences.beginner": "Beginner",
    "preferences.intermediate": "Intermediate",
    "preferences.advanced": "Advanced",
    "preferences.immediate": "I need immediate assistance",
    "preferences.planning": "I'm planning for future needs",
    "preferences.supporting": "I'm supporting someone else",
    "preferences.saving": "Saving...",
    "preferences.continue": "Save Preferences",

    // Dashboard
    "dashboard.welcome": "Welcome back, {name}!",
    "dashboard.interests": "Here are your personalized resources based on your needs",
    "dashboard.askAI": "Ask for Help",
    "dashboard.profile": "My Profile",
    "dashboard.articles": "Resources",
    "dashboard.tutorials": "Services",
    "dashboard.courses": "Programs",
    "dashboard.read": "View {type}",
    "dashboard.loading": "Loading your personalized dashboard...",
    "dashboard.generalWelcome": "Housing & Healthcare Resources",
    "dashboard.generalDescription":
      "Browse available resources for housing assistance, healthcare services, and emergency support.",
    "dashboard.searchPlaceholder": "Search for resources...",
    "dashboard.all": "All",
    "dashboard.emergency": "Emergency",
    "dashboard.housing": "Housing",
    "dashboard.healthcare": "Healthcare",
    "dashboard.food": "Food",
    "dashboard.emergencyResources": "Emergency Resources",
    "dashboard.housingResources": "Housing Resources",
    "dashboard.healthcareResources": "Healthcare Resources",
    "dashboard.foodResources": "Food Resources",
    "dashboard.highPriority": "High Priority",
    "dashboard.viewDetails": "View Details",
    "dashboard.previewMode": "You're viewing a general resource dashboard",
    "dashboard.previewDescription":
      "Sign up or log in to get personalized resources based on your specific needs and situation.",

    // Chatbot
    "chatbot.title": "Resource Assistant",
    "chatbot.placeholder": "Ask a question...",
    "chatbot.welcome": "How can I help you today?",
    "chatbot.description": "Ask me about housing, healthcare, or other resources you need.",

    // Language
    "language.select": "Select Language",
    "language.preference": "Language Preference",
    "language.save": "Save Language",

    // Verification
    "verify.loading": "Verifying your email...",
    "verify.loadingDesc": "Please wait while we verify your email address.",
    "verify.success": "Email Verified!",
    "verify.successDesc": "Your email has been successfully verified. Your account is now active.",
    "verify.error": "Verification Failed",
    "verify.errorDesc": "We encountered a problem verifying your email.",
    "verify.pleaseWait": "This may take a moment...",
    "verify.accountReady": "Your account is now ready to use. You can now access all features of CareCompass.",
    "verify.login": "Log In to Your Account",
    "verify.browse": "Browse Resources",
    "verify.tryAgain": "Try Signing Up Again",
    "verify.home": "Return to Home",
    "verify.didntReceive": "Didn't receive the verification email?",
    "verify.resendEmail": "Resend Verification Email",
    "verify.resending": "Resending...",
    "verify.emailResent": "Verification email has been resent. Please check your inbox.",
    "verify.resendWait": "Resend available in",
    "verify.resendTitle": "Resend Verification Email",
    "verify.resendDesc": "Enter your email address below to receive a new verification link.",
    "verify.resendLink": "Resend verification email",
    "verify.needVerification": "Need to verify your email?",

    // Common
    "common.cancel": "Cancel",
    "common.loading": "Loading...",

    // Profile
    "profile.signOutConfirmTitle": "Sign Out",
    "profile.signOutConfirmDesc": "Are you sure you want to sign out?",
    "profile.signOutConfirm": "Sign Out",
    "profile.deleteAccountTitle": "Delete Account",
    "profile.deleteAccountDesc":
      "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.",
    "profile.deleteAccountConfirm": "Delete Account",

    // Onboarding
    "onboarding.back": "Back",
    "onboarding.next": "Next",
    "onboarding.complete": "Complete",
    "onboarding.completing": "Completing...",
    "onboarding.confirmation": "Confirmation",
    "onboarding.confirmationTitle": "Confirm Your Information",
    "onboarding.confirmationDescription": "Please review your information before completing the onboarding process.",
    "onboarding.reviewPrompt":
      "Please review your information below. You can always update these details later in your profile.",
    "onboarding.category.personal": "Personal Information",
    "onboarding.category.housing": "Housing",
    "onboarding.category.healthcare": "Healthcare",
    "onboarding.category.financial": "Financial",
    "onboarding.category.education": "Education",
    "onboarding.category.employment": "Employment",
    "onboarding.title.personal": "Tell us about yourself",
    "onboarding.title.housing": "Tell us about your housing situation",
    "onboarding.title.healthcare": "Tell us about your healthcare needs",
    "onboarding.title.financial": "Tell us about your financial situation",
    "onboarding.title.education": "Tell us about your education",
    "onboarding.title.employment": "Tell us about your employment",
    "onboarding.description.personal": "This information helps us personalize your experience.",
    "onboarding.description.housing": "Help us understand your housing needs and situation.",
    "onboarding.description.healthcare": "Tell us about your healthcare needs and access.",
    "onboarding.description.financial": "This helps us recommend financial assistance programs.",
    "onboarding.description.education": "Information about your education background.",
    "onboarding.description.employment": "Details about your current employment status.",

    // Location
    "location.current": "Location",
    "location.select": "Select Location",
    "location.nyc": "New York City",
    "location.boston": "Boston",
    "location.chicago": "Chicago",
    "location.la": "Los Angeles",
    "location.miami": "Miami",
    "location.filter": "Filter by location",
    login: {
      title: "Sign In",
      description: "Enter your email and password to access your account",
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot password?",
      signIn: "Sign In",
      signingIn: "Signing in...",
      noAccount: "Don't have an account?",
      createAccount: "Create an account",
      continueAsGuest: "Continue as guest",
      error: "Invalid email or password",
    },
  },

  es: {
    // Home page
    "hero.title": "Encuentre Recursos de Vivienda y Atención Médica",
    "hero.subtitle": "Acceda a información crítica y servicios de apoyo adaptados a sus necesidades específicas.",
    "hero.getStarted": "Comenzar",
    "hero.login": "Iniciar Sesión",
    "features.title": "Recursos Esenciales",
    "features.profile.title": "Cree Su Perfil",
    "features.profile.description":
      "Regístrese y cuéntenos sobre sus necesidades para obtener asistencia personalizada.",
    "features.content.title": "Explorar Recursos",
    "features.content.description": "Encuentre vivienda, atención médica y servicios de apoyo en su área.",
    "features.assistant.title": "Obtenga Ayuda Inmediata",
    "features.assistant.description": "Conéctese con servicios de emergencia y apoyo en crisis cuando más lo necesite.",
    "cta.title": "¿Necesita Ayuda Ahora?",
    "cta.subtitle": "Si está en una situación de emergencia, estos recursos pueden brindarle asistencia inmediata.",
    "cta.button": "Cree Su Cuenta",

    // Resource categories
    "preferences.housing": "Asistencia de Vivienda",
    "preferences.housing.description":
      "Encuentre refugios de emergencia, opciones de vivienda asequible, programas de asistencia para el alquiler e información sobre derechos de vivienda.",
    "preferences.healthcare": "Servicios de Salud",
    "preferences.healthcare.description":
      "Acceda a información sobre clínicas gratuitas, asistencia con seguros, servicios de salud mental y atención médica familiar.",

    // Emergency section
    "emergency.housing": "Vivienda de Emergencia",
    "emergency.housing.description": "Línea directa de refugio de emergencia 24/7",
    "emergency.healthcare": "Crisis de Salud",
    "emergency.healthcare.description": "Asistencia médica de emergencia",
    "emergency.family": "Servicios Familiares",
    "emergency.family.description": "Apoyo para familias en crisis",

    // Footer
    "footer.description": "Conectando a las personas con recursos esenciales de vivienda y atención médica.",
    "footer.quickLinks": "Enlaces Rápidos",
    "footer.home": "Inicio",
    "footer.resources": "Recursos",
    "footer.account": "Mi Cuenta",
    "footer.emergency": "Emergencia",
    "footer.housingCrisis": "Crisis de Vivienda",
    "footer.healthCrisis": "Crisis de Salud",
    "footer.about": "Acerca de",
    "footer.aboutText":
      "CareCompass se dedica a ayudar a las poblaciones vulnerables a acceder a recursos críticos de vivienda y atención médica.",
    "footer.emergency911": "Si está experimentando una emergencia inmediata, llame al 911.",
    "footer.copyright": "Todos los derechos reservados.",

    // Auth pages
    "signup.title": "Crear una cuenta",
    "signup.description": "Ingrese su información para crear una cuenta",
    "signup.name": "Nombre Completo",
    "signup.email": "Correo Electrónico",
    "signup.password": "Contraseña",
    "signup.button": "Registrarse",
    "signup.loading": "Creando cuenta...",
    "signup.login": "¿Ya tiene una cuenta?",
    "signup.loginLink": "Iniciar sesión",
    "signup.verificationSent":
      "Hemos enviado un enlace de verificación a su dirección de correo electrónico. Por favor revise su bandeja de entrada (y carpeta de spam) y haga clic en el enlace para verificar su cuenta.",
    "signup.afterVerification":
      "Después de verificar su correo electrónico, podrá iniciar sesión y acceder a todas las funciones de CareCompass.",

    "login.title": "Inicie sesión en su cuenta",
    "login.description": "Ingrese sus credenciales para acceder a su cuenta",
    "login.email": "Correo Electrónico",
    "login.password": "Contraseña",
    "login.button": "Iniciar Sesión",
    "login.loading": "Iniciando sesión...",
    "login.signup": "¿No tiene una cuenta?",
    "login.signupLink": "Regístrese",
    "login.forgotPassword": "¿Olvidó su contraseña?",

    // Preferences page
    "preferences.title": "Sus Preferencias de Recursos",
    "preferences.description": "Seleccione los tipos de recursos que le interesan para personalizar su panel.",
    "preferences.topics": "Categorías de Recursos",
    "preferences.experience": "¿Cuál es su situación actual?",
    "preferences.beginner": "Principiante",
    "preferences.intermediate": "Intermedio",
    "preferences.advanced": "Avanzado",
    "preferences.immediate": "Necesito asistencia inmediata",
    "preferences.planning": "Estoy planificando para necesidades futuras",
    "preferences.supporting": "Estoy apoyando a otra persona",
    "preferences.saving": "Guardando...",
    "preferences.continue": "Guardar Preferencias",

    // Dashboard
    "dashboard.welcome": "¡Bienvenido de nuevo, {name}!",
    "dashboard.interests": "Aquí están sus recursos personalizados basados en sus necesidades",
    "dashboard.askAI": "Pedir Ayuda",
    "dashboard.profile": "Mi Perfil",
    "dashboard.articles": "Recursos",
    "dashboard.tutorials": "Servicios",
    "dashboard.courses": "Programas",
    "dashboard.read": "Ver {type}",
    "dashboard.loading": "Cargando su panel personalizado...",
    "dashboard.generalWelcome": "Recursos de Vivienda y Atención Médica",
    "dashboard.generalDescription":
      "Explore los recursos disponibles para asistencia de vivienda, servicios de salud y apoyo de emergencia.",
    "dashboard.searchPlaceholder": "Buscar recursos...",
    "dashboard.all": "Todos",
    "dashboard.emergency": "Emergencia",
    "dashboard.housing": "Vivienda",
    "dashboard.healthcare": "Salud",
    "dashboard.food": "Alimentación",
    "dashboard.emergencyResources": "Recursos de Emergencia",
    "dashboard.housingResources": "Recursos de Vivienda",
    "dashboard.healthcareResources": "Recursos de Salud",
    "dashboard.foodResources": "Recursos de Alimentación",
    "dashboard.highPriority": "Alta Prioridad",
    "dashboard.viewDetails": "Ver Detalles",
    "dashboard.previewMode": "Está viendo un panel de recursos general",
    "dashboard.previewDescription":
      "Regístrese o inicie sesión para obtener recursos personalizados según sus necesidades y situación específicas.",

    // Chatbot
    "chatbot.title": "Asistente de Recursos",
    "chatbot.placeholder": "Haga una pregunta...",
    "chatbot.welcome": "¿Cómo puedo ayudarle hoy?",
    "chatbot.description": "Pregúnteme sobre vivienda, atención médica u otros recursos que necesite.",

    // Language
    "language.select": "Seleccionar Idioma",
    "language.preference": "Preferencia de Idioma",
    "language.save": "Guardar Idioma",

    // Verification
    "verify.loading": "Verificando su correo electrónico...",
    "verify.loadingDesc": "Por favor espere mientras verificamos su dirección de correo electrónico.",
    "verify.success": "¡Correo Electrónico Verificado!",
    "verify.successDesc": "Su correo electrónico ha sido verificado con éxito. Su cuenta ahora está activa.",
    "verify.error": "Verificación Fallida",
    "verify.errorDesc": "Encontramos un problema al verificar su correo electrónico.",
    "verify.pleaseWait": "Esto puede tomar un momento...",
    "verify.accountReady":
      "Su cuenta ahora está lista para usar. Ahora puede acceder a todas las funciones de CareCompass.",
    "verify.login": "Iniciar Sesión en Su Cuenta",
    "verify.browse": "Explorar Recursos",
    "verify.tryAgain": "Intentar Registrarse Nuevamente",
    "verify.home": "Volver al Inicio",
    "verify.didntReceive": "¿No recibió el correo de verificación?",
    "verify.resendEmail": "Reenviar Correo de Verificación",
    "verify.resending": "Reenviando...",
    "verify.emailResent": "El correo de verificación ha sido reenviado. Por favor revise su bandeja de entrada.",
    "verify.resendWait": "Reenvío disponible en",
    "verify.resendTitle": "Reenviar Correo de Verificación",
    "verify.resendDesc":
      "Ingrese su dirección de correo electrónico a continuación para recibir un nuevo enlace de verificación.",
    "verify.resendLink": "Reenviar correo de verificación",
    "verify.needVerification": "¿Necesita verificar su correo electrónico?",

    // Common
    "common.cancel": "Cancelar",
    "common.loading": "Cargando...",

    // Profile
    "profile.signOutConfirmTitle": "Cerrar Sesión",
    "profile.signOutConfirmDesc": "¿Está seguro de que desea cerrar sesión?",
    "profile.signOutConfirm": "Cerrar Sesión",
    "profile.deleteAccountTitle": "Eliminar Cuenta",
    "profile.deleteAccountDesc":
      "¿Está seguro de que desea eliminar su cuenta? Esta acción no se puede deshacer y todos sus datos se eliminarán permanentemente.",
    "profile.deleteAccountConfirm": "Eliminar Cuenta",

    // Onboarding
    "onboarding.back": "Atrás",
    "onboarding.next": "Siguiente",
    "onboarding.complete": "Completar",
    "onboarding.completing": "Completando...",
    "onboarding.confirmation": "Confirmación",
    "onboarding.confirmationTitle": "Confirme su información",
    "onboarding.confirmationDescription":
      "Por favor revise su información antes de completar el proceso de incorporación.",
    "onboarding.reviewPrompt":
      "Por favor revise su información a continuación. Siempre puede actualizar estos detalles más tarde en su perfil.",
    "onboarding.category.personal": "Información Personal",
    "onboarding.category.housing": "Vivienda",
    "onboarding.category.healthcare": "Atención Médica",
    "onboarding.category.financial": "Financiera",
    "onboarding.category.education": "Educación",
    "onboarding.category.employment": "Empleo",
    "onboarding.title.personal": "Cuéntenos sobre usted",
    "onboarding.title.housing": "Cuéntenos sobre su situación de vivienda",
    "onboarding.title.healthcare": "Cuéntenos sobre sus necesidades de atención médica",
    "onboarding.title.financial": "Cuéntenos sobre su situación financiera",
    "onboarding.title.education": "Cuéntenos sobre su educación",
    "onboarding.title.employment": "Cuéntenos sobre su empleo",
    "onboarding.description.personal": "Esta información nos ayuda a personalizar su experiencia.",
    "onboarding.description.housing": "Ayúdenos a entender sus necesidades y situación de vivienda.",
    "onboarding.description.healthcare": "Cuéntenos sobre sus necesidades de atención médica y acceso.",
    "onboarding.description.financial": "Esto nos ayuda a recomendar programas de asistencia financiera.",
    "onboarding.description.education": "Información sobre su formación académica.",
    "onboarding.description.employment": "Detalles sobre su situación laboral actual.",

    // Location
    "location.current": "Ubicación",
    "location.select": "Seleccionar Ubicación",
    "location.nyc": "Nueva York",
    "location.boston": "Boston",
    "location.chicago": "Chicago",
    "location.la": "Los Ángeles",
    "location.miami": "Miami",
    "location.filter": "Filtrar por ubicación",
    login: {
      title: "Iniciar Sesión",
      description: "Ingrese su correo electrónico y contraseña para acceder a su cuenta",
      email: "Correo electrónico",
      password: "Contraseña",
      forgotPassword: "¿Olvidó su contraseña?",
      signIn: "Iniciar Sesión",
      signingIn: "Iniciando sesión...",
      noAccount: "¿No tiene una cuenta?",
      createAccount: "Crear una cuenta",
      continueAsGuest: "Continuar como invitado",
      error: "Correo electrónico o contraseña inválidos",
    },
  },

  fr: {
    // Home page
    "hero.title": "Trouvez des ressources de logement et de soins de santé",
    "hero.subtitle":
      "Accédez à des informations cruciales et à des services de soutien adaptés à vos besoins spécifiques.",
    "hero.getStarted": "Commencer",
    "hero.login": "Connexion",
    "features.title": "Ressources essentielles",
    "features.profile.title": "Créez votre profil",
    "features.profile.description":
      "Inscrivez-vous et parlez-nous de vos besoins pour obtenir une assistance personnalisée.",
    "features.content.title": "Parcourir les ressources",
    "features.content.description":
      "Trouvez des logements, des soins de santé et des services de soutien dans votre région.",
    "features.assistant.title": "Obtenez une aide immédiate",
    "features.assistant.description":
      "Connectez-vous avec les services d'urgence et de soutien en cas de crise quand vous en avez le plus besoin.",
    "cta.title": "Besoin d'aide maintenant?",
    "cta.subtitle":
      "Si vous êtes dans une situation d'urgence, ces ressources peuvent vous fournir une assistance immédiate.",
    "cta.button": "Créez votre compte",

    // Resource categories
    "preferences.housing": "Assistance au logement",
    "preferences.housing.description":
      "Trouvez des refuges d'urgence, des options de logement abordable, des programmes d'aide au loyer et des informations sur les droits au logement.",
    "preferences.healthcare": "Services de santé",
    "preferences.healthcare.description":
      "Accédez à des informations sur les cliniques gratuites, l'assistance en matière d'assurance, les services de santé mentale et les soins de santé familiaux.",

    // Emergency section
    "emergency.housing": "Logement d'urgence",
    "emergency.housing.description": "Ligne d'assistance pour refuge d'urgence 24/7",
    "emergency.healthcare": "Crise sanitaire",
    "emergency.healthcare.description": "Assistance médicale d'urgence",
    "emergency.family": "Services familiaux",
    "emergency.family.description": "Soutien aux familles en crise",

    // Footer
    "footer.description":
      "Mettre en relation les personnes avec des ressources essentielles de logement et de soins de santé.",
    "footer.quickLinks": "Liens rapides",
    "footer.home": "Accueil",
    "footer.resources": "Ressources",
    "footer.account": "Mon compte",
    "footer.emergency": "Urgence",
    "footer.housingCrisis": "Crise du logement",
    "footer.healthCrisis": "Crise sanitaire",
    "footer.about": "À propos",
    "footer.aboutText":
      "CareCompass se consacre à aider les populations vulnérables à accéder aux ressources essentielles en matière de logement et de soins de santé.",
    "footer.emergency911": "Si vous êtes dans une situation d'urgence immédiate, veuillez appeler le 911.",
    "footer.copyright": "Tous droits réservés.",

    // Auth pages
    "signup.title": "Créer un compte",
    "signup.description": "Entrez vos informations pour créer un compte",
    "signup.name": "Nom complet",
    "signup.email": "Email",
    "signup.password": "Mot de passe",
    "signup.button": "S'inscrire",
    "signup.loading": "Création du compte...",
    "signup.login": "Vous avez déjà un compte?",
    "signup.loginLink": "Se connecter",
    "signup.verificationSent":
      "Nous avons envoyé un lien de vérification à votre adresse email. Veuillez vérifier votre boîte de réception (et dossier spam) et cliquer sur le lien pour vérifier votre compte.",
    "signup.afterVerification":
      "Après avoir vérifié votre email, vous pourrez vous connecter et accéder à toutes les fonctionnalités de CareCompass.",

    "login.title": "Connectez-vous à votre compte",
    "login.description": "Entrez vos identifiants pour accéder à votre compte",
    "login.email": "Email",
    "login.password": "Mot de passe",
    "login.button": "Se connecter",
    "login.loading": "Connexion...",
    "login.signup": "Vous n'avez pas de compte?",
    "login.signupLink": "S'inscrire",
    "login.forgotPassword": "Mot de passe oublié?",

    // Preferences page
    "preferences.title": "Vos préférences de ressources",
    "preferences.description":
      "Sélectionnez les types de ressources qui vous intéressent pour personnaliser votre tableau de bord.",
    "preferences.topics": "Catégories de ressources",
    "preferences.experience": "Quelle est votre situation actuelle?",
    "preferences.beginner": "Débutant",
    "preferences.intermediate": "Intermédiaire",
    "preferences.advanced": "Avancé",
    "preferences.immediate": "J'ai besoin d'une assistance immédiate",
    "preferences.planning": "Je planifie pour des besoins futurs",
    "preferences.supporting": "Je soutiens quelqu'un d'autre",
    "preferences.saving": "Enregistrement...",
    "preferences.continue": "Enregistrer les préférences",

    // Dashboard
    "dashboard.welcome": "Bienvenue, {name}!",
    "dashboard.interests": "Voici vos ressources personnalisées basées sur vos besoins",
    "dashboard.askAI": "Demander de l'aide",
    "dashboard.profile": "Mon profil",
    "dashboard.articles": "Ressources",
    "dashboard.tutorials": "Services",
    "dashboard.courses": "Programmes",
    "dashboard.read": "Voir {type}",
    "dashboard.loading": "Chargement de votre tableau de bord personnalisé...",
    "dashboard.generalWelcome": "Ressources de logement et de soins de santé",
    "dashboard.generalDescription":
      "Parcourez les ressources disponibles pour l'aide au logement, les services de santé et le soutien d'urgence.",
    "dashboard.searchPlaceholder": "Rechercher des ressources...",
    "dashboard.all": "Tout",
    "dashboard.emergency": "Urgence",
    "dashboard.housing": "Logement",
    "dashboard.healthcare": "Santé",
    "dashboard.food": "Alimentation",
    "dashboard.emergencyResources": "Ressources d'urgence",
    "dashboard.housingResources": "Ressources de logement",
    "dashboard.healthcareResources": "Ressources de santé",
    "dashboard.foodResources": "Ressources alimentaires",
    "dashboard.highPriority": "Haute priorité",
    "dashboard.viewDetails": "Voir les détails",
    "dashboard.previewMode": "Vous consultez un tableau de bord de ressources général",
    "dashboard.previewDescription":
      "Inscrivez-vous ou connectez-vous pour obtenir des ressources personnalisées en fonction de vos besoins et de votre situation spécifiques.",

    // Language
    "language.preference": "Préférence de langue",
    "language.select": "Sélectionner la langue",
    "language.save": "Enregistrer la langue",

    // Common
    "common.cancel": "Annuler",
    "common.loading": "Chargement...",

    // Onboarding
    "onboarding.next": "Suivant",
    "onboarding.back": "Retour",
    "onboarding.complete": "Terminer",
    "onboarding.completing": "Finalisation...",

    // Location
    "location.current": "Emplacement",
    "location.select": "Sélectionner un emplacement",
    "location.nyc": "New York",
    "location.boston": "Boston",
    "location.chicago": "Chicago",
    "location.la": "Los Angeles",
    "location.miami": "Miami",
    "location.filter": "Filtrer par emplacement",
  },

  ar: {
    // Key phrases
    "hero.title": "ابحث عن موارد الإسكان والرعاية الصحية",
    "hero.subtitle": "الوصول إلى المعلومات الحيوية وخدمات الدعم المصممة خصيصًا لاحتياجاتك المحددة.",
    "hero.getStarted": "ابدأ",
    "hero.login": "تسجيل الدخول",
    "features.title": "الموارد الأساسية",
    "features.profile.title": "إنشاء ملفك الشخصي",
    "features.profile.description": "قم بالتسجيل وأخبرنا عن احتياجاتك للحصول على مساعدة مخصصة.",
    "features.content.title": "تصفح الموارد",
    "features.content.description": "ابحث عن السكن والرعاية الصحية وخدمات الدعم في منطقتك.",
    "features.assistant.title": "احصل على مساعدة فورية",
    "features.assistant.description": "تواصل مع خدمات الطوارئ ودعم الأزمات عندما تحتاج إليها أكثر.",
    "cta.title": "هل تحتاج إلى مساعدة الآن؟",
    "cta.subtitle": "إذا كنت في حالة طوارئ، يمكن لهذه الموارد تقديم مساعدة فورية.",
    "cta.button": "إنشاء حسابك",

    // Resource categories
    "preferences.housing": "مساعدة الإسكان",
    "preferences.housing.description":
      "ابحث عن ملاجئ الطوارئ وخيارات الإسكان بأسعار معقولة وبرامج المساعدة في الإيجار ومعلومات حقوق السكن.",
    "preferences.healthcare": "خدمات الرعاية الصحية",
    "preferences.healthcare.description":
      "الوصول إلى معلومات حول العيادات المجانية ومساعدة التأمين وخدمات الصحة النفسية والرعاية الصحية للأسرة.",

    // Dashboard
    "dashboard.welcome": "مرحبًا بعودتك، {name}!",
    "dashboard.askAI": "طلب المساعدة",
    "dashboard.profile": "ملفي الشخصي",
    "onboarding.next": "التالي",
    "onboarding.back": "السابق",
    "onboarding.complete": "إكمال",
    "language.preference": "تفضيل اللغة",

    // Location
    "location.current": "الموقع",
    "location.select": "اختر موقعا",
    "location.nyc": "نيويورك",
    "location.boston": "بوسطن",
    "location.chicago": "شيكاغو",
    "location.la": "لوس أنجلوس",
    "location.miami": "ميامي",
    "location.filter": "تصفية حسب الموقع",
  },

  bn: {
    // Key phrases
    "hero.title": "আবাসন এবং স্বাস্থ্যসেবা সংস্থান খুঁজুন",
    "hero.subtitle": "আপনার নির্দিষ্ট চাহিদা অনুযায়ী গুরুত্বপূর্ণ তথ্য এবং সহায়তা পরিষেবাগুলি অ্যাক্সেস করুন।",
    "hero.getStarted": "শুরু করুন",
    "hero.login": "লগইন",
    "features.title": "অপরিহার্য সংস্থান",
    "features.profile.title": "আপনার প্রোফাইল তৈরি করুন",
    "features.profile.description": "ব্যক্তিগতকৃত সহায়তা পেতে সাইন আপ করুন এবং আপনার প্রয়োজনীয়তা সম্পর্কে আমাদের জানান।",
    "features.content.title": "সংস্থান ব্রাউজ করুন",
    "features.content.description": "আপনার এলাকায় আবাসন, স্বাস্থ্যসেবা এবং সহায়তা পরিষেবা খুঁজুন।",
    "features.assistant.title": "অবিলম্বে সাহায্য পান",
    "features.assistant.description": "যখন আপনার সবচেয়ে বেশি প্রয়োজন তখন জরুরি পরিষেবা এবং সংকট সহায়তার সাথে সংযোগ করুন।",
    "cta.title": "এখনই সাহায্য দরকার?",
    "cta.subtitle": "আপনি যদি কোনও জরুরী পরিস্থিতিতে থাকেন, এই সংস্থানগুলি অবিলম্বে সহায়তা প্রদান করতে পারে।",
    "cta.button": "আপনার অ্যাকাউন্ট তৈরি করুন",

    // Resource categories
    "preferences.housing": "আবাসন সহায়তা",
    "preferences.housing.description":
      "জরুরী আশ্রয়, সাশ্রয়ী মূল্যের আবাসন বিকল্প, ভাড়া সহায়তা প্রোগ্রাম এবং আবাসন অধিকার সম্পর্কিত তথ্য খুঁজুন।",
    "preferences.healthcare": "স্বাস্থ্যসেবা পরিষেবা",
    "preferences.healthcare.description":
      "বিনামূল্যে ক্লিনিক, বীমা সহায়তা, মানসিক স্বাস্থ্য পরিষেবা এবং পারিবারিক স্বাস্থ্যসেবা সম্পর্কিত তথ্য অ্যাক্সেস করুন।",

    // Dashboard
    "dashboard.welcome": "ফিরে আসার জন্য স্বাগতম, {name}!",
    "dashboard.askAI": "সাহায্য চান",
    "dashboard.profile": "আমার প্রোফাইল",
    "onboarding.next": "পরবর্তী",
    "onboarding.back": "পূর্ববর্তী",
    "onboarding.complete": "সম্পূর্ণ",
    "language.preference": "ভাষা পছন্দ",

    // Location
    "location.current": "অবস্থান",
    "location.select": "অবস্থান নির্বাচন করুন",
    "location.nyc": "নিউ ইয়র্ক সিটি",
    "location.boston": "বোস্টন",
    "location.chicago": "শিকাগো",
    "location.la": "লস এঞ্জেলেস",
    "location.miami": "মিয়ামি",
    "location.filter": "অবস্থান অনুসারে ফিল্টার করুন",
  },

  ht: {
    // Key phrases
    "hero.title": "Jwenn Resous Lojman ak Swen Sante",
    "hero.subtitle": "Jwenn enfòmasyon enpòtan ak sèvis sipò ki adapte a bezwen espesifik ou yo.",
    "hero.getStarted": "Kòmanse",
    "hero.login": "Konekte",
    "features.title": "Resous Esansyèl",
    "features.profile.title": "Kreye Pwofil Ou",
    "features.profile.description": "Enskri epi di nou bezwen ou yo pou jwenn asistans pèsonalize.",
    "features.content.title": "Navige Resous Yo",
    "features.content.description": "Jwenn lojman, swen sante, ak sèvis sipò nan zòn ou.",
    "features.assistant.title": "Jwenn Èd Imedya",
    "features.assistant.description": "Konekte ak sèvis ijans ak sipò kriz lè ou bezwen yo plis.",
    "cta.title": "Bezwen Èd Kounye a?",
    "cta.subtitle": "Si ou nan yon sitiyasyon ijans, resous sa yo ka bay asistans imedya.",
    "cta.button": "Kreye Kont Ou",

    // Resource categories
    "preferences.housing": "Asistans Lojman",
    "preferences.housing.description":
      "Jwenn abri ijans, opsyon lojman abòdab, pwogram asistans lwaye, ak enfòmasyon sou dwa lojman.",
    "preferences.healthcare": "Sèvis Swen Sante",
    "preferences.healthcare.description":
      "Jwenn enfòmasyon sou klinik gratis, asistans asirans, sèvis sante mantal, ak swen sante fanmi.",

    // Dashboard
    "dashboard.welcome": "Byenveni retou, {name}!",
    "dashboard.askAI": "Mande Èd",
    "dashboard.profile": "Pwofil Mwen",
    "onboarding.next": "Pwochen",
    "onboarding.back": "Retounen",
    "onboarding.complete": "Konplete",
    "language.preference": "Preferans Lang",

    // Location
    "location.current": "Kote",
    "location.select": "Chwazi Kote",
    "location.nyc": "Nouyòk",
    "location.boston": "Bòstòn",
    "location.chicago": "Chikago",
    "location.la": "Los Angeles",
    "location.miami": "Miami",
    "location.filter": "Filtre pa kote",
  },

  ko: {
    // Key phrases
    "hero.title": "주택 및 의료 자원 찾기",
    "hero.subtitle": "귀하의 특정 요구에 맞춤화된 중요한 정보 및 지원 서비스에 접근하세요.",
    "hero.getStarted": "시작하기",
    "hero.login": "로그인",
    "features.title": "필수 자원",
    "features.profile.title": "프로필 생성",
    "features.profile.description": "가입하고 맞춤형 지원을 받기 위해 귀하의 요구 사항을 알려주세요.",
    "features.content.title": "자원 탐색",
    "features.content.description": "귀하 지역의 주택, 의료 및 지원 서비스를 찾으세요.",
    "features.assistant.title": "즉각적인 도움 받기",
    "features.assistant.description": "가장 필요한 시점에 응급 서비스 및 위기 지원과 연결하세요.",
    "cta.title": "지금 도움이 필요하신가요?",
    "cta.subtitle": "응급 상황에 처해 있다면, 이러한 자원들이 즉각적인 지원을 제공할 수 있습니다.",
    "cta.button": "계정 생성하기",

    // Resource categories
    "preferences.housing": "주택 지원",
    "preferences.housing.description": "응급 쉼터, 저렴한 주택 옵션, 임대 지원 프로그램 및 주택 권리 정보를 찾으세요.",
    "preferences.healthcare": "의료 서비스",
    "preferences.healthcare.description":
      "무료 클리닉, 보험 지원, 정신 건강 서비스 및 가족 의료에 관한 정보에 접근하세요.",

    // Dashboard
    "dashboard.welcome": "다시 오신 것을 환영합니다, {name}님!",
    "dashboard.askAI": "도움 요청",
    "dashboard.profile": "내 프로필",
    "onboarding.next": "다음",
    "onboarding.back": "이전",
    "onboarding.complete": "완료",
    "language.preference": "언어 환경설정",

    // Location
    "location.current": "위치",
    "location.select": "위치 선택",
    "location.nyc": "뉴욕시",
    "location.boston": "보스턴",
    "location.chicago": "시카고",
    "location.la": "로스앤젤레스",
    "location.miami": "마이애미",
    "location.filter": "위치별 필터링",
  },

  zh: {
    // Key phrases
    "hero.title": "寻找住房和医疗资源",
    "hero.subtitle": "获取针对您特定需求定制的重要信息和支持服务。",
    "hero.getStarted": "开始使用",
    "hero.login": "登录",
    "features.title": "基本资源",
    "features.profile.title": "创建您的个人资料",
    "features.profile.description": "注册并告诉我们您的需求，获取个性化援助。",
    "features.content.title": "浏览资源",
    "features.content.description": "寻找您所在地区的住房、医疗保健和支持服务。",
    "features.assistant.title": "获得即时帮助",
    "features.assistant.description": "在您最需要时连接紧急服务和危机支持。",
    "cta.title": "现在需要帮助吗？",
    "cta.subtitle": "如果您处于紧急情况，这些资源可以提供即时援助。",
    "cta.button": "创建您的账户",

    // Resource categories
    "preferences.housing": "住房援助",
    "preferences.housing.description": "寻找紧急避难所、可负担住房选项、租金援助计划和住房权益信息。",
    "preferences.healthcare": "医疗服务",
    "preferences.healthcare.description": "获取有关免费诊所、保险援助、心理健康服务和家庭医疗保健的信息。",

    // Dashboard
    "dashboard.welcome": "欢迎回来，{name}！",
    "dashboard.askAI": "寻求帮助",
    "dashboard.profile": "我的个人资料",
    "onboarding.next": "下一步",
    "onboarding.back": "返回",
    "onboarding.complete": "完成",
    "language.preference": "语言偏好",

    // Location
    "location.current": "地点",
    "location.select": "选择地点",
    "location.nyc": "纽约市",
    "location.boston": "波士顿",
    "location.chicago": "芝加哥",
    "location.la": "洛杉矶",
    "location.miami": "迈阿密",
    "location.filter": "按地点筛选",
  },

  it: {
    // Key phrases
    "hero.title": "Trova risorse per alloggio e assistenza sanitaria",
    "hero.subtitle": "Accedi a informazioni critiche e servizi di supporto su misura per le tue esigenze specifiche.",
    "hero.getStarted": "Inizia",
    "hero.login": "Accedi",
    "features.title": "Risorse essenziali",
    "features.profile.title": "Crea il tuo profilo",
    "features.profile.description": "Iscriviti e raccontaci delle tue esigenze per ottenere assistenza personalizzata.",
    "features.content.title": "Sfoglia le risorse",
    "features.content.description": "Trova alloggio, assistenza sanitaria e servizi di supporto nella tua zona.",
    "features.assistant.title": "Ottieni aiuto immediato",
    "features.assistant.description":
      "Connettiti con servizi di emergenza e supporto in caso di crisi quando ne hai più bisogno.",
    "cta.title": "Hai bisogno di aiuto ora?",
    "cta.subtitle": "Se ti trovi in una situazione di emergenza, queste risorse possono fornire assistenza immediata.",
    "cta.button": "Crea il tuo account",

    // Resource categories
    "preferences.housing": "Assistenza abitativa",
    "preferences.housing.description":
      "Trova rifugi di emergenza, opzioni abitative a prezzi accessibili, programmi di assistenza per l'affitto e informazioni sui diritti abitativi.",
    "preferences.healthcare": "Servizi sanitari",
    "preferences.healthcare.description":
      "Accedi a informazioni sulle cliniche gratuite, assistenza assicurativa, servizi di salute mentale e assistenza sanitaria familiare.",

    // Dashboard
    "dashboard.welcome": "Bentornato, {name}!",
    "dashboard.askAI": "Chiedi aiuto",
    "dashboard.profile": "Il mio profilo",
    "onboarding.next": "Avanti",
    "onboarding.back": "Indietro",
    "onboarding.complete": "Completa",
    "language.preference": "Preferenza lingua",

    // Location
    "location.current": "Posizione",
    "location.select": "Seleziona posizione",
    "location.nyc": "New York",
    "location.boston": "Boston",
    "location.chicago": "Chicago",
    "location.la": "Los Angeles",
    "location.miami": "Miami",
    "location.filter": "Filtra per posizione",
  },

  pl: {
    // Key phrases
    "hero.title": "Znajdź zasoby mieszkaniowe i opieki zdrowotnej",
    "hero.subtitle": "Uzyskaj dostęp do kluczowych informacji i usług wsparcia dostosowanych do Twoich potrzeb.",
    "hero.getStarted": "Rozpocznij",
    "hero.login": "Zaloguj się",
    "features.title": "Niezbędne zasoby",
    "features.profile.title": "Utwórz swój profil",
    "features.profile.description":
      "Zarejestruj się i powiedz nam o swoich potrzebach, aby uzyskać spersonalizowaną pomoc.",
    "features.content.title": "Przeglądaj zasoby",
    "features.content.description": "Znajdź mieszkanie, opiekę zdrowotną i usługi wsparcia w Twojej okolicy.",
    "features.assistant.title": "Uzyskaj natychmiastową pomoc",
    "features.assistant.description":
      "Połącz się z służbami ratunkowymi i wsparciem kryzysowym, gdy najbardziej tego potrzebujesz.",
    "cta.title": "Potrzebujesz pomocy teraz?",
    "cta.subtitle": "Jeśli znajdujesz się w sytuacji awaryjnej, te zasoby mogą zapewnić natychmiastową pomoc.",
    "cta.button": "Utwórz swoje konto",

    // Resource categories
    "preferences.housing": "Pomoc mieszkaniowa",
    "preferences.housing.description":
      "Znajdź schroniska awaryjne, dostępne opcje mieszkaniowe, programy pomocy czynszowej i informacje o prawach mieszkaniowych.",
    "preferences.healthcare": "Usługi opieki zdrowotnej",
    "preferences.healthcare.description":
      "Uzyskaj dostęp do informacji o bezpłatnych klinikach, pomocy ubezpieczeniowej, usługach zdrowia psychicznego i opiece zdrowotnej dla rodzin.",

    // Dashboard
    "dashboard.welcome": "Witaj ponownie, {name}!",
    "dashboard.askAI": "Poproś o pomoc",
    "dashboard.profile": "Mój profil",
    "onboarding.next": "Dalej",
    "onboarding.back": "Wstecz",
    "onboarding.complete": "Zakończ",
    "language.preference": "Preferencje językowe",

    // Location
    "location.current": "Lokalizacja",
    "location.select": "Wybierz lokalizację",
    "location.nyc": "Nowy Jork",
    "location.boston": "Boston",
    "location.chicago": "Chicago",
    "location.la": "Los Angeles",
    "location.miami": "Miami",
    "location.filter": "Filtruj według lokalizacji",
  },

  ru: {
    // Key phrases
    "hero.title": "Найти ресурсы по жилью и здравоохранению",
    "hero.subtitle":
      "Получите доступ к важной информации и услугам поддержки, адаптированным к вашим конкретным потребностям.",
    "hero.getStarted": "Начать",
    "hero.login": "Войти",
    "features.title": "Основные ресурсы",
    "features.profile.title": "Создайте свой профиль",
    "features.profile.description":
      "Зарегистрируйтесь и расскажите нам о своих потребностях, чтобы получить персонализированную помощь.",
    "features.content.title": "Просмотр ресурсов",
    "features.content.description": "Найдите жилье, медицинское обслуживание и службы поддержки в вашем районе.",
    "features.assistant.title": "Получите немедленную помощь",
    "features.assistant.description":
      "Свяжитесь со службами экстренной помощи и кризисной поддержки, когда вам это больше всего нужно.",
    "cta.title": "Нужна помощь прямо сейчас?",
    "cta.subtitle": "Если вы находитесь в чрезвычайной ситуации, эти ресурсы могут предоставить немедленную помощь.",
    "cta.button": "Создайте свою учетную запись",

    // Resource categories
    "preferences.housing": "Помощь с жильем",
    "preferences.housing.description":
      "Найдите экстренные приюты, доступные варианты жилья, программы помощи с арендой и информацию о правах на жилье.",
    "preferences.healthcare": "Медицинские услуги",
    "preferences.healthcare.description":
      "Получите доступ к информации о бесплатных клиниках, помощи со страховкой, услугах психического здоровья и семейной медицинской помощи.",

    // Dashboard
    "dashboard.welcome": "С возвращением, {name}!",
    "dashboard.askAI": "Запросить помощь",
    "dashboard.profile": "Мой профиль",
    "onboarding.next": "Далее",
    "onboarding.back": "Назад",
    "onboarding.complete": "Завершить",
    "language.preference": "Предпочтение языка",

    // Location
    "location.current": "Местоположение",
    "location.select": "Выберите местоположение",
    "location.nyc": "Нью-Йорк",
    "location.boston": "Бостон",
    "location.chicago": "Чикаго",
    "location.la": "Лос-Анджелес",
    "location.miami": "Майами",
    "location.filter": "Фильтровать по местоположению",
  },

  ur: {
    // Key phrases
    "hero.title": "رہائش اور صحت کی دیکھ بھال کے وسائل تلاش کریں",
    "hero.subtitle": "اپنی مخصوص ضروریات کے مطابق اہم معلومات اور معاون خدمات تک رسائی حاصل کریں۔",
    "hero.getStarted": "شروع کریں",
    "hero.login": "لاگ ان کریں",
    "features.title": "ضروری وسائل",
    "features.profile.title": "اپنا پروفائل بنائیں",
    "features.profile.description": "سائن اپ کریں اور ہمیں اپنی ضروریات کے بارے میں بتائیں تاکہ ذاتی مدد حاصل کر سکیں۔",
    "features.content.title": "وسائل براؤز کریں",
    "features.content.description": "اپنے علاقے میں رہائش، صحت کی دیکھ بھال، اور معاون خدمات تلاش کریں۔",
    "features.assistant.title": "فوری مدد حاصل کریں",
    "features.assistant.description": "جب آپ کو سب سے زیادہ ضرورت ہو تو ایمرجنسی خدمات اور بحران کی مدد سے جڑیں۔",
    "cta.title": "ابھی مدد چاہیے؟",
    "cta.subtitle": "اگر آپ ایمرجنسی حالت میں ہیں، تو یہ وسائل فوری مدد فراہم کر سکتے ہیں۔",
    "cta.button": "اپنا اکاؤنٹ بنائیں",

    // Resource categories
    "preferences.housing": "رہائشی امداد",
    "preferences.housing.description":
      "ایمرجنسی پناہ گاہیں، سستی رہائش کے اختیارات، کرایہ کی امداد کے پروگرام، اور رہائشی حقوق کی معلومات تلاش کریں۔",
    "preferences.healthcare": "صحت کی دیکھ بھال کی خدمات",
    "preferences.healthcare.description":
      "مفت کلینکس، انشورنس کی مدد، ذہنی صحت کی خدمات، اور خاندانی صحت کی دیکھ بھال کے بارے میں معلومات تک رسائی حاصل کریں۔",

    // Dashboard
    "dashboard.welcome": "واپس آنے پر خوش آمدید، {name}!",
    "dashboard.askAI": "مدد طلب کریں",
    "dashboard.profile": "میرا پروفائل",
    "onboarding.next": "اگلا",
    "onboarding.back": "پیچھے",
    "onboarding.complete": "مکمل کریں",
    "language.preference": "زبان کی ترجیح",

    // Location
    "location.current": "مقام",
    "location.select": "مقام منتخب کریں",
    "location.nyc": "نیویارک شہر",
    "location.boston": "بوسٹن",
    "location.chicago": "شکاگو",
    "location.la": "لاس اینجلس",
    "location.miami": "میامی",
    "location.filter": "مقام کے لحاظ سے فلٹر کریں",
  },

  yi: {
    // Key phrases
    "hero.title": "געפֿינען וווינונג און געזונטהייט הילף מיטלען",
    "hero.subtitle": "צוטריט צו קריטישע אינפֿאָרמאַציע און שטיצונג סערוויסעס צוגעפאסט צו אייערע ספעציפישע באדערפענישן.",
    "hero.getStarted": "אָנהייבן",
    "hero.login": "אַרייַנלאָגירן",
    "features.title": "וויכטיקע רעסורסן",
    "features.profile.title": "שאַפֿן אייער פּראָפֿיל",
    "features.profile.description": "אָנשרייַבן און זאָגן אונדז וועגן אייערע באדערפענישן צו באַקומען פּערסאַנאַלייזד הילף.",
    "features.content.title": "בלעטערן רעסורסן",
    "features.content.description": "געפֿינען וווינונג, געזונטהייט פּפלעגע, און שטיצונג סערוויסעס אין אייער געגנט.",
    "features.assistant.title": "באַקומען באַלדיק הילף",
    "features.assistant.description": "פאַרבינדן מיט נויטפאַל סערוויסעס און קריזיס שטיצע ווען איר דאַרפֿט עס רוב.",
    "cta.title": "דאַרפֿן הילף איצט?",
    "cta.subtitle": "אויב איר זענט אין אַ נויטפאַל סיטואַציע, די רעסורסן קענען צושטעלן באַלדיק הילף.",
    "cta.button": "שאַפֿן אייער אַקאַונט",

    // Resource categories
    "preferences.housing": "וווינונג הילף",
    "preferences.housing.description":
      "געפֿינען נויטפאַל שוץ, צוטריטלעך וווינונג אָפּציעס, רענט הילף פּראָגראַמען, און וווינונג רעכט אינפֿאָרמאַציע.",
    "preferences.healthcare": "געזונטהייט פּפלעגע סערוויסעס",
    "preferences.healthcare.description":
      "צוטריט צו אינפֿאָרמאַציע וועגן אָן אָפּצאָל קליניקס, פֿאַרזיכערונג הילף, גייסטיק געזונטהייט סערוויסעס, און פאַמיליע געזונטהייט פּפלעגע.",

    // Dashboard
    "dashboard.welcome": "ווילקום צוריק, {name}!",
    "dashboard.askAI": "בעטן הילף",
    "dashboard.profile": "מיין פּראָפֿיל",
    "onboarding.next": "ווייַטער",
    "onboarding.back": "צוריק",
    "onboarding.complete": "פאַרענדיקן",
    "language.preference": "שפּראַך פּרעפֿערענץ",

    // Location
    "location.current": "אָרט",
    "location.select": "אויסקלייַבן אָרט",
    "location.nyc": "ניו יארק סיטי",
    "location.boston": "באָסטאָן",
    "location.chicago": "טשיקאַגאָ",
    "location.la": "לאס אנדזשעלעס",
    "location.miami": "מיאַמי",
    "location.filter": "פילטרירן לויט אָרט",
  },
}

// Helper function to get a translation
export function getTranslation(lang: string, key: string, replacements?: Record<string, string>): string {
  const langData = translations[lang] || translations.en
  let text = langData[key] || translations.en[key] || key

  if (replacements) {
    Object.entries(replacements).forEach(([key, value]) => {
      text = text.replace(`{${key}}`, value)
    })
  }

  return text
}
