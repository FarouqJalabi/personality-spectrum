module ApplicationHelper
  def on_home?
    !(request.url.include? 'about') && !(request.url.include? '/test')
  end
  def on_test?
    request.url.include? '/test'
  end
  def on_about?
    # Doesn't work with #about
    request.url.include? 'about'
  end
end
