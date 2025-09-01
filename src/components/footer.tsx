import { Button } from "@/components/ui/button"
import {
  PhoneIcon,
  MapPinIcon,
  InstagramIcon,
  FacebookIcon,
  MessageCircleIcon,
} from "lucide-react"
import { getYear } from "date-fns"
import profile from "@/constants/profile"
import socmed from "@/constants/socmed"
import location from "@/constants/location"

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-xl mb-4 font-[family-name:var(--font-fredoka)]">
              Kontak Kami
            </h4>
            <div className="flex items-start space-x-3">
              <MapPinIcon className="h-5 w-5 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white/90 text-sm leading-relaxed">
                  {profile.ADDRESS}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <PhoneIcon className="h-5 w-5" />
              <a
                href={`tel:${profile.PHONE}`}
                className="text-white/90 hover:text-white transition-colors">
                {profile.PHONE}
              </a>
            </div>
            {/* Social Media */}
            <div className="pt-4">
              <h5 className="font-semibold mb-3 font-[family-name:var(--font-fredoka)]">
                Ikuti Kami
              </h5>
              <div className="flex space-x-4">
                <a
                  href={`${socmed.INSTAGRAM}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href={`${socmed.FACEBOOK}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href={`${socmed.WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <MessageCircleIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          {/* Operating Hours */}
          <div className="space-y-4">
            <h4 className="font-bold text-xl mb-4 font-[family-name:var(--font-fredoka)]">
              Jam Operasional
            </h4>
            <div className="space-y-2 text-white/90">
              <div className="flex justify-between">
                <span>Senin - Jumat</span>
                <span>09:00 - 20:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sabtu - Minggu</span>
                <span>09:00 - 20:00</span>
              </div>
            </div>
            {/* <div className="pt-4"> */}
            {/*   <h5 className="font-semibold mb-3 font-[family-name:var(--font-fredoka)]"> */}
            {/*     Metode Pembayaran */}
            {/*   </h5> */}
            {/*   <p className="text-white/90 text-sm"> */}
            {/*     Cash, QRIS, Transfer Bank, GoPay, OVO, Dana */}
            {/*   </p> */}
            {/* </div> */}
          </div>
          {/* Map */}
          <div className="space-y-4">
            <h4 className="font-bold text-xl mb-4 font-[family-name:var(--font-fredoka)]">
              Lokasi Kami
            </h4>
            <div className="bg-white/10 rounded-lg overflow-hidden">
              <iframe
                src={`${location.MAP_IFRAME_URL}`}
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"></iframe>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => window.open(location.LINK, "_blank")}>
              <MapPinIcon className="h-4 w-4 mr-2" />
              Buka di Google Maps
            </Button>
          </div>
        </div>
        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-sm text-white/70">
            © {getYear(new Date())} {profile.NAME} {profile.BRANCH}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
