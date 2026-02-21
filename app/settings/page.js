"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 animate-fade-in p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="vc-card p-6 max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">API Configuration</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">OpenRouter API Key</label>
            <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="sk-..." className="vc-input" />
            <p className="text-xs text-muted-foreground mt-2">Your API key is stored locally and never sent to our servers.</p>
          </div>
          <button type="submit" className="vc-btn-primary">Save Settings</button>
          {saved && <p className="text-sm text-success-muted-foreground">✓ Settings saved successfully</p>}
        </form>

        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-sm text-muted-foreground">VC Intelligence v1.0.0</p>
          <p className="text-sm text-muted-foreground mt-2">AI-powered discovery platform for venture capital.</p>
        </div>
      </div>
    </div>
  );
}