
import React, { useState, useRef } from 'react';
import { WardrobeItem, Category, Style } from '../types';
import { analyzeClothingImage } from '../services/geminiService';

interface UploadProps {
  onUploadSuccess: (item: WardrobeItem) => void;
  onNavigate: (page: string) => void;
}

const Upload: React.FC<UploadProps> = ({ onUploadSuccess, onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [itemDetails, setItemDetails] = useState<Partial<WardrobeItem> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setItemDetails(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    try {
      const base64Data = selectedImage.split(',')[1];
      const result = await analyzeClothingImage(base64Data);
      setItemDetails(result);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = () => {
    if (selectedImage && itemDetails) {
      const newItem: WardrobeItem = {
        id: Math.random().toString(36).substr(2, 9),
        imageUrl: selectedImage,
        type: itemDetails.type || 'Unknown Item',
        color: itemDetails.color || 'Unknown Color',
        fabric: itemDetails.fabric || 'Unknown Fabric',
        category: (itemDetails.category as Category) || 'Tops',
        style: (itemDetails.style as Style) || 'Casual',
        createdAt: Date.now()
      };
      onUploadSuccess(newItem);
      onNavigate('dashboard');
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setItemDetails(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-[#2d2d2d] mb-2">Expand Your Wardrobe</h2>
        <p className="text-[#7a7a7a]">Upload a clear photo of your clothing item for AI analysis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: Upload Area */}
        <div className="space-y-6">
          {!selectedImage ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[3/4] bg-white border-2 border-dashed border-[#e5e1d8] rounded-[40px] flex flex-col items-center justify-center p-8 cursor-pointer hover:border-[#8c7e6a] transition-all group"
            >
              <div className="w-20 h-20 bg-[#faf9f6] rounded-3xl flex items-center justify-center mb-6 text-[#e5e1d8] group-hover:text-[#8c7e6a] transition-colors">
                <i className="fas fa-cloud-upload-alt text-3xl"></i>
              </div>
              <p className="text-center font-medium text-[#4a4a4a]">Click to upload or drag & drop</p>
              <p className="text-center text-xs text-[#9a9a9a] mt-2">JPEG, PNG up to 10MB</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
              />
            </div>
          ) : (
            <div className="relative aspect-[3/4] bg-white rounded-[40px] overflow-hidden shadow-2xl border border-[#f2f0ea]">
              <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              {!isAnalyzing && !itemDetails && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button 
                    onClick={handleReset}
                    className="px-6 py-2 bg-white text-[#4a4a4a] rounded-full text-sm font-bold shadow-lg"
                  >
                    Change Photo
                  </button>
                </div>
              )}
            </div>
          )}

          {selectedImage && !itemDetails && (
            <button 
              onClick={startAnalysis}
              disabled={isAnalyzing}
              className={`w-full py-4 rounded-full font-medium transition-all ${
                isAnalyzing 
                  ? 'bg-[#e5e1d8] text-[#9a9a9a] cursor-not-allowed' 
                  : 'bg-[#4a4a4a] text-white hover:bg-[#333] shadow-lg'
              }`}
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-3"></i>
                  Analyzing Fabric & Style...
                </span>
              ) : 'Analyze Item'}
            </button>
          )}
        </div>

        {/* Right: Details / Confirmation */}
        <div className="bg-[#faf9f6] p-8 sm:p-10 rounded-[40px] border border-[#e5e1d8] min-h-[500px] flex flex-col justify-center">
          {isAnalyzing ? (
            <div className="text-center py-12 space-y-4">
              <div className="flex justify-center">
                <div className="animate-pulse flex space-x-2">
                  <div className="w-2 h-2 bg-[#8c7e6a] rounded-full"></div>
                  <div className="w-2 h-2 bg-[#8c7e6a] rounded-full delay-75"></div>
                  <div className="w-2 h-2 bg-[#8c7e6a] rounded-full delay-150"></div>
                </div>
              </div>
              <p className="text-[#8c7e6a] font-medium italic">Our AI stylist is observing the details...</p>
            </div>
          ) : itemDetails ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
              <h3 className="text-2xl font-serif font-bold text-[#2d2d2d]">Item Identification</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a9a9a] mb-2">Clothing Type</label>
                  <p className="text-xl text-[#4a4a4a] border-b border-[#e5e1d8] pb-2">{itemDetails.type}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a9a9a] mb-2">Primary Color</label>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full border border-[#e5e1d8]" style={{backgroundColor: itemDetails.color?.toLowerCase()}}></div>
                      <p className="text-[#4a4a4a]">{itemDetails.color}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a9a9a] mb-2">Fabric</label>
                    <p className="text-[#4a4a4a] capitalize">{itemDetails.fabric}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a9a9a] mb-2">Category</label>
                    <p className="text-[#4a4a4a]">{itemDetails.category}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a9a9a] mb-2">Primary Style</label>
                    <p className="text-[#4a4a4a]">{itemDetails.style}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-col space-y-4">
                <button 
                  onClick={handleSave}
                  className="w-full py-4 bg-[#8c7e6a] text-white rounded-full font-medium shadow-md hover:bg-[#7a6d59] transition-all"
                >
                  Confirm & Add to Wardrobe
                </button>
                <button 
                  onClick={handleReset}
                  className="w-full py-4 border border-[#e5e1d8] text-[#7a7a7a] rounded-full font-medium hover:bg-white transition-all"
                >
                  Discard
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-6">
              <i className="fas fa-magic text-4xl text-[#e5e1d8]"></i>
              <p className="text-[#7a7a7a]">AI analysis results will appear here after you upload an image.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
