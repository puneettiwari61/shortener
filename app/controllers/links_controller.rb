class LinksController < ApplicationController
  before_action :find_link, only: %i[show update]

  def index
    links = Link.all
    render status: :ok, json: { links: links }
  end

  def create
    link = Link.new(url_params)
    if link.save
      render status: :ok, json: { notice: "Link created successfully" }
    else
      render status: :unprocessable_entity,
             json: { errors: link.errors.full_messages.to_sentence }
    end
  end

  def show
    update_link_count
    render status: :ok, json: { link: @link }
  end

  def update
  end

  private

  def url_params
    params.require(:link).permit(:url)
  end

  def find_link
    @link = Link.find_by(slug: params[:slug])
    puts "#{@link} from load link"
  rescue ActiveRecord::RecordNotFound => errors
    render status: :not_found, json: { errors: errors }
  end

  def update_link_count
    @link.increment!(:clicked)
  end
end
