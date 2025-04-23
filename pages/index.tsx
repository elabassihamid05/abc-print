import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Badge,
  Loader,
} from "@mantine/core";
import { motion } from "framer-motion";

import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Drawer, DrawerContent } from "@/components/drawer";
import { MdPhoneInTalk } from "react-icons/md";
import API from "@/router/index";

const phone = "0661564009";

const _products = [
  {
    id: 1,
    title: "T-shirt Amazigh Design",
    category: "T-shirts Personnalisés",
    price: "199 DH",
    image:
      "https://images.unsplash.com/photo-1695048133148-53895a7cec8f?q=80&w=1000",
    shortDescription:
      "<h4>Découvrez notre t-shirt avec motifs amazighs traditionnels, imprimés avec des symboles berbères authentiques.</h4>",
    richEditorContent:
      "<p>Ce t-shirt unique met en valeur la richesse du patrimoine amazigh avec des motifs géométriques traditionnels et des symboles berbères. Fait en coton premium avec impression haute qualité qui résiste au lavage.</p>",
    phone: phone,
  },
  {
    id: 2,
    title: "T-shirt Calligraphie Arabe",
    category: "T-shirts Personnalisés",
    price: "249 DH",
    image:
      "https://images.unsplash.com/photo-1706003625035-5a4b3c4a0b0f?q=80&w=1000",
    shortDescription:
      "<h4>T-shirt avec calligraphie arabe élégante, personnalisable avec le texte de votre choix en style Thuluth.</h4>",
    richEditorContent:
      "<p>Exprimez votre amour pour la calligraphie arabe avec ce t-shirt personnalisable. La calligraphie est réalisée dans le style Thuluth classique, parfait pour les citations du Coran ou expressions arabes.</p>",
    phone: phone,
  },
  {
    id: 3,
    title: "T-shirt Zellige Marocain",
    category: "T-shirts Personnalisés",
    price: "229 DH",
    image:
      "https://images.unsplash.com/photo-1695048133148-53895a7cec8f?q=80&w=1000",
    shortDescription:
      "<h4>T-shirt inspiré des motifs zellige traditionnels marocains, avec des designs géométriques colorés.</h4>",
    richEditorContent:
      "<p>Ce t-shirt s'inspire des magnifiques motifs zellige qu'on trouve dans l'architecture marocaine. Les motifs géométriques complexes sont imprimés avec des couleurs vives et authentiques.</p>",
    phone: phone,
  },
  {
    id: 4,
    title: "T-shirt Caftan Modern",
    category: "T-shirts Personnalisés",
    price: "279 DH",
    image:
      "https://images.unsplash.com/photo-1706003625035-5a4b3c4a0b0f?q=80&w=1000",
    shortDescription:
      "<h4>Design moderne inspiré du caftan marocain traditionnel, avec broderies et motifs élégants.</h4>",
    richEditorContent:
      "<p>Une fusion moderne entre le t-shirt contemporain et le caftan traditionnel marocain. Les motifs de broderie traditionnelle sont imprimés avec précision sur un t-shirt de qualité supérieure.</p>",
    phone: phone,
  },
  {
    id: 5,
    title: "T-shirt Fès Collection",
    category: "T-shirts Personnalisés",
    price: "199 DH",
    image:
      "https://images.unsplash.com/photo-1695048133148-53895a7cec8f?q=80&w=1000",
    shortDescription:
      "<h4>Collection inspirée de la médina de Fès, avec des motifs artisanaux traditionnels.</h4>",
    richEditorContent:
      "<p>Portez l'histoire de Fès avec ce t-shirt qui présente des motifs inspirés de l'artisanat traditionnel de la médina. Chaque design raconte une histoire de l'art marocain.</p>",
    phone: phone,
  },
  {
    id: 6,
    title: "T-shirt Sabra Silk",
    category: "T-shirts Personnalisés",
    price: "259 DH",
    image:
      "https://images.unsplash.com/photo-1706003625035-5a4b3c4a0b0f?q=80&w=1000",
    shortDescription:
      "<h4>Design inspiré des motifs de la soie sabra traditionnelle, avec des couleurs vibrantes.</h4>",
    richEditorContent:
      "<p>Ce t-shirt capture l'essence de la soie sabra marocaine avec ses motifs colorés et ses designs traditionnels. Une célébration moderne de l'artisanat ancestral marocain.</p>",
    phone: phone,
  },
];

export default function ArtisanaMaroc() {
  const router = useRouter();
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: products,
    isLoading,
    error,
  } = API.public.useFirstCommunityProject(
    "https://script.google.com/macros/s/AKfycbxYpr-ALvwYBQK6EpNYQ2U639hyTtxeR-P1I5EiXOODa6GrXDu5h1OoZeQuPLEfGi0B/exec"
  );

  useEffect(() => {
    const productId = router.query.productId;
    if (productId) {
      setIsProductSelected(true);
    }
  }, [router.query.productId]);

  const handleScroll = () => {
    const productsSection = document.querySelector("#products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Text>Error: {error.message || "Une erreur est survenue"}</Text>
      </div>
    );
  }

  return (
    <>
      <Drawer
        open={isProductSelected}
        onOpenChange={(open) => {
          if (open === false) {
            const { productId, ...filteredQuery } = router.query;

            router.push({ query: filteredQuery }, null, { shallow: true });
            setIsProductSelected(false);
          }
        }}
      >
        <DrawerContent>
          <ProductDetails product={selectedProduct} />
        </DrawerContent>
      </Drawer>
      <section className="">
        {/* Hero Section */}
        <Hero handleScroll={handleScroll} />

        {/* Products Section */}
        <Container size="lg" py="xl" id="products">
          <Title order={2} mb="xl">
            Nos Produits
          </Title>
          <SimpleGrid
            cols={3}
            spacing="lg"
            breakpoints={[
              { maxWidth: "md", cols: 2 },
              { maxWidth: "sm", cols: 1 },
            ]}
          >
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => {
                  router.push(`?productId=${product.id}`);
                  setSelectedProduct(product);
                }}
              />
            ))}
          </SimpleGrid>
        </Container>

        {/* Footer */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "40px 0",
            marginTop: "60px",
          }}
        >
          <Container size="lg">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-6">
                <a
                  href="https://www.tiktok.com/@tarikgsmphone"
                  target="_blank"
                  className="text-gray-600 transition-colors hover:text-orange-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href={`https://wa.me/${phone}?text=Salam`}
                  target="_blank"
                  className="text-gray-600 transition-colors hover:text-green-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/tarik_gsm2023i/"
                  target="_blank"
                  className="text-gray-600 transition-colors hover:text-pink-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@tarikgsmphone"
                  target="_blank"
                  className="text-gray-600 transition-colors hover:text-black"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
              <Text align="center" color="dimmed">
                © 2024 ABCPrint Maroc. Tous droits réservés.
              </Text>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}

const Hero = ({ handleScroll }) => {
  return (
    <section className="relative min-h-[85vh] py-10 flex items-center justify-center overflow-hidden bg-gradient-to-r from-gray-50 to-orange-50 rounded-sm">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat bg-center" />
      </div>

      <div className="container max-w-5xl px-4 mx-auto">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <img
                  src="https://i.ibb.co/9k5JZBSR/logo.jpg"
                  alt="Logo"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                Découvrez la <span className="text-orange-600">Collection</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Découvrez notre collection unique de t-shirts personnalisables
                avec des designs originaux. Des motifs artistiques aux
                impressions tendance, exprimez votre style avec nos créations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={handleScroll}
                className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white transition-all duration-300 bg-orange-600 rounded-full group hover:bg-orange-700"
              >
                <span className="relative z-10">Découvrir nos produits</span>
                <div className="absolute inset-0 transition-transform duration-300 origin-left transform scale-x-0 bg-orange-700 group-hover:scale-x-100" />
              </button>
            </motion.div>
          </div>

          {/* Right Content - Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
              <img
                src="https://i.ibb.co/Cpw3DZLb/8505960d-f742-4533-9490-90684ef122fc.jpg"
                // src="https://images.unsplash.com/photo-1695048133148-53895a7cec8f?q=80&w=1000"
                alt="Tech Products"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl hover:shadow-xl"
    >
      <div className="overflow-hidden h-[250px] w-full">
        <img
          src={
            product.image ||
            "https://dummyimage.com/600x400/000/fff&text=soon..."
          }
          alt={product.title}
          className="object-contain w-full h-full transition-transform duration-300 transform bg-gray-100 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            dangerouslySetInnerHTML={{ __html: product.title }}
            className="text-xl font-semibold"
          />
          {product.category && (
            <Badge className="px-3 py-1 text-sm text-orange-800 bg-orange-100 rounded-full">
              {product.category}
            </Badge>
          )}
        </div>

        <div
          className="mt-auto mb-4 text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: product.shortDescription }}
        />

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-600">
            {product.price}
          </span>
          <button
            onClick={onClick}
            className="px-4 py-2 text-white transition-colors bg-orange-600 rounded-lg hover:bg-orange-700"
          >
            Voir détails
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductDetails = ({ product }) => {
  const sendMessageWa = () => {
    const encodedMessage = encodeURIComponent(
      `Bonjour, je suis intéressé(e) par votre produit: ${product.title}`
    );
    const phoneFormat = String(product.phone).slice(1);
    window.open(
      `https://wa.me/${phoneFormat}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const callPhoneNumber = () => {
    window.open(`tel:${product.phone}`, "_blank");
  };

  return (
    <div className="p-4 overflow-y-auto md:p-8 bg-gradient-to-br from-white to-gray-50">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-5 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div
            dangerouslySetInnerHTML={{ __html: product.title }}
            className="text-4xl font-bold text-gray-900"
          />
          <div className="flex items-center gap-4">
            <Badge className="px-6 py-2 text-lg font-medium text-orange-800 bg-orange-100 rounded-full">
              {product.category}
            </Badge>
            <span className="text-3xl font-bold text-orange-600">
              {product.price}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid max-w-6xl gap-16 mx-auto lg:grid-cols-2">
        {/* Left Column - Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="relative overflow-hidden group rounded-2xl">
            <img
              src={product.image}
              alt={product.title}
              className="object-cover w-full transition-transform duration-500 h-[800px] group-hover:scale-110"
            />
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/40 to-transparent group-hover:opacity-100" />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={sendMessageWa}
              className="relative px-8 py-4 overflow-hidden bg-green-500 group rounded-xl"
            >
              <div className="absolute inset-0 transition-transform duration-300 origin-left transform scale-x-0 bg-green-600 group-hover:scale-x-100" />
              <div className="relative z-10 flex items-center justify-center gap-3 text-white">
                <FaWhatsapp size={24} className="shrink-0" />
                <span className="text-lg font-medium">WhatsApp</span>
              </div>
            </button>

            <button
              onClick={callPhoneNumber}
              className="relative px-8 py-4 overflow-hidden bg-orange-600 group rounded-xl"
            >
              <div className="absolute inset-0 transition-transform duration-300 origin-left transform scale-x-0 bg-orange-700 group-hover:scale-x-100" />
              <div className="relative z-10 flex items-center justify-center gap-3 text-white">
                <MdPhoneInTalk size={24} className="shrink-0" />
                <span className="text-lg font-medium">Appeler</span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Right Column - Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          {/* Short Description */}
          <div className="p-8 bg-white shadow-lg rounded-2xl">
            <h3 className="mb-6 text-2xl font-semibold text-gray-900">
              Aperçu du produit
            </h3>
            <div
              dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              className="prose prose-lg text-gray-600"
            />
          </div>

          {/* Detailed Description */}
          <div className="p-8 bg-white shadow-lg rounded-2xl">
            <h3 className="mb-6 text-2xl font-semibold text-gray-900">
              Description détaillée
            </h3>
            <div
              dangerouslySetInnerHTML={{ __html: product.richEditoreContent }}
              className="prose prose-lg text-gray-600"
            />
          </div>

          {/* Contact Information */}
          <div className="p-6 border border-orange-100 bg-orange-50 rounded-xl">
            <div className="flex items-center gap-4 text-orange-800">
              <MdPhoneInTalk size={24} />
              <span className="text-lg font-medium">{product.phone}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
