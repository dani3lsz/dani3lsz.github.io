
class GalleryController < ApplicationController
  
  def index
    uri = "https://zr52d8r7tc.execute-api.us-east-1.amazonaws.com/test/parse?type=indexGallery"
    request = Typhoeus.get(uri, followlocation: true)
    @index = JSON.parse(request.body)
  end

  def show
    @gallerySlug = params['gallery_slug']
    uri = "https://zr52d8r7tc.execute-api.us-east-1.amazonaws.com/test/parse?url=http://techcrunch.com/gallery/#{@gallerySlug}/"
    request = Typhoeus.get(uri, followlocation: true)
    @gallery = JSON.parse(request.body)
    # Reformat Slides
    @gallery['slides'].each_with_index do |slide,idx|
      if slide['image']
        @gallery['slides'][idx]['type'] = 'image'
      elsif slide['slide-html'].include?('youtube-holder')
        @gallery['slides'][idx]['type'] = 'youtube'
        @gallery['slides'][idx]['iframe'] = slide['slide-html'].to_s.scan(/<iframe.+\/iframe>/).first
        @gallery['slides'][idx]['youTubeID'] = slide['slide-html'].to_s.scan(/\/embed\/([^\/\?]+)/).flatten.first
        @gallery['slides'][idx]['youTubeSrc'] = slide['slide-html'].to_s.scan(/src="([^"]+)"/).flatten.first
        @gallery['slides'][idx]['width'] = slide['slide-html'].to_s.scan(/width="([^"]+)"/).flatten.first.to_i rescue nil
        @gallery['slides'][idx]['height'] = slide['slide-html'].to_s.scan(/height="([^"]+)"/).flatten.first.to_i rescue nil
      end
      @gallery['slides'][idx]['title'] = @gallery['captions'][idx]['header'] if @gallery['captions'][idx]['header']
      @gallery['slides'][idx]['description'] = @gallery['captions'][idx]['caption'] if @gallery['captions'][idx]['caption']
      @gallery['slides'][idx]['description_html'] = @gallery['captions'][idx]['caption-html'].gsub(/<h3>.+<\/h3>/,'').gsub(/<div[^>]+>/,'').gsub('</div>','').gsub(/^[ ]+/,'').gsub(/[ ]+$/,'') if @gallery['captions'][idx]['caption-html']
    end
  end
end
