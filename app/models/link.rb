class Link < ActiveRecord::Base
  before_validation :generate_slug

  validates :url, presence: true, length: { maximum: 255 }, format: URI::regexp(%w[http https])
  validates :slug, presence: true, uniqueness: true

  def generate_slug
    loop do
      self.slug = [*("a".."z"), *("0".."9")].shuffle[0, 8].join
      break slug unless Link.where(slug: self.slug).exists?
    end
  end
end
