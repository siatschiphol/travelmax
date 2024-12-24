'use client'

import { Shield, Toggle, Download, Lock } from 'lucide-react'
import ContentLayout from '@/components/layouts/ContentLayout'

const privacySettings = [
  {
    id: 'profile-visibility',
    title: 'Profile Visibility',
    description: 'Control who can see your profile information',
    icon: Shield
  },
  {
    id: 'data-sharing',
    title: 'Data Sharing',
    description: 'Manage how your data is shared with our services',
    icon: Lock
  }
]

export default function PrivacyPage() {
  return (
    <ContentLayout
      title="Privacy Settings"
      description="Manage your privacy preferences and data settings"
    >
      <div className="space-y-8">
        {/* Privacy Controls */}
        <section className="space-y-6">
          {privacySettings.map((setting) => {
            const Icon = setting.icon
            return (
              <div
                key={setting.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{setting.title}</h3>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                  <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                </button>
              </div>
            )
          })}
        </section>

        {/* Data Export */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Data Export</h2>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              Download a copy of your personal data. The export will be in JSON format.
            </p>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
          </div>
        </section>

        {/* Privacy Policy */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Privacy Policy</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600">
              Our privacy policy explains how we collect, use, and protect your personal information.
              We are committed to maintaining the trust and confidence of our visitors to our web site.
            </p>
            <h3 className="text-base font-medium mt-4 mb-2">Information Collection</h3>
            <p className="text-gray-600">
              We collect information when you register on our site, place an order, subscribe to our newsletter,
              respond to a survey or fill out a form.
            </p>
          </div>
        </section>
      </div>
    </ContentLayout>
  )
}
